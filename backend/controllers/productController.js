import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
const getProducts=asyncHandler(async (req, res) =>{
    const pageSize=process.env.PAGINATION_LIMIT;
    // To get a value , a query query parameter from the URL , we use request dot query
    // if its not there by_default its 1;
    const page=Number(req.query.pageNumber)|| 1;
    // for search
    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
    // to count total number of pages, Mongoose method count documents
    const count=await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword})
    .limit(pageSize)
    .skip(pageSize*(page-1));
    // now we are going to return not only products but pages as well
    res.json({products, page,pages:Math.ceil(count/pageSize)});
});


const getProductById=asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id);
    if (product) {
        return res.json(product);
    }
    res.status(404);
    throw new Error('Resource not found')
});
// @ desc create a product
// @ route POST/api/products
// @ access Private/admin

const createProduct=asyncHandler(async (req, res) =>{
    const product= new Product({
        name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
    })
    const createdProduct = await product.save();
  res.status(201).json(createdProduct);
    
});
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });
  //@desc Delete a product 
  // @route Delete/api/products/:id
  //@access private admin
  const deleteProduct = asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id);
   if(product){
    await Product.deleteOne({_id: product._id});
    res.status(200).json({message:'Product deleted'});
   }
   else{
    res.status(404);
    throw new Error('Resource not found');

   }
});
//@desc create a new review
  // @route POST /api/products/:id/reviews
  //@access private 
  const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    console.log("viennnet")
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());
      console.log(product);
  
      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
  
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
  
      product.rating = product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.reviews.length;
      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });
  
  // @desc    Get top rated products
  // @route   GET /api/products/top
  // @access  Public
  
  

export {getProducts, getProductById, createProduct,updateProduct,deleteProduct, createProductReview,
    };