import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
//@ desc create new order
//@ route Post/api/orders
//@ access private
const addOrderItems=asyncHandler(async (req, res) =>{
    // we are just going to response
    // create a new order
    // we get this from the body of http request
    const { orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    ShippingPrice,
    totalPrice
     }=req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }
  else{
    const order=new Order({
        orderItems:orderItems.map((x) =>({
            ...x,
            product:x._id,
            _id:undefined
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        ShippingPrice,
        totalPrice
    });
    const createdOrder=await order.save();
    res.status(201).json(createdOrder)

  }
});
//@ desc get logged in user order
//@route Get/api/orders/myorders
//@ access private
const getMyOrders=asyncHandler(async (req, res) =>{
    // requested user sath agar id match kr gyi then we going to response
    const orders=await Order.find({user: req.user._id});
    res.status(200).json(orders);
    
});
//@ desc Get order byId
//@route Get/api/orders/:id
//@ access private
const getOrderById=asyncHandler(async (req, res) =>{
   const order= await Order.findById(req.params.id).populate
   ('user',
   'name email'
   );
   if(order){
    res.status(200).json(order);
   }
   else{
    res.status(404);
    throw new Error('Order not found')
   }
});
//@ desc update order to be paid
//@route put/api/orders/:id/pay
//@ access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    
    const order = await Order.findById(req.params.id);
  
    if (order) {
  
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
  // save it to database
      const updatedOrder = await order.save();
  
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });
//@ desc update order to delivered
//@route put/api/orders/:id/deliver
//@ access private
const updateOrderToDelivered=asyncHandler(async (req, res) =>{
  // get the order by id
  const order = await Order.findById(req.params.id);
  if(order){
    order.isDelivered=true;
    order.deliveredAt= Date.now();
    // to save in database
    const updateOrder= await order.save();
    res.status(200).json(updateOrder);

  }
  else{
    res.status(404);
    throw new Error('Order not found');

  }
    
});
//@ Get All Orders
//@route Get/api/orders
//@ access private/Admin
const getOrders=asyncHandler(async (req, res) =>{
    // we are just going to response
    const orders=await Order.find({}).populate('user','id name');
    res.status(200).json(orders);
});

export {addOrderItems,getMyOrders,getOrderById,updateOrderToPaid,updateOrderToDelivered,getOrders};