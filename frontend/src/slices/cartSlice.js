// we are using create slice not create api coz we dont have asynchronous request
import {createSlice} from "@reduxjs/toolkit";
import{updateCart} from '../utils/cartUtils.js';
// caulation of rice,tax,shipping price are in utils in src in frontend
// items are stored in local storage

const initialState=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):{cartItems: [],shippingAddress:{}, paymentMethod:'PayPal'};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item=action.payload;
            // if exist item in cart id match with item-id update the quantity
            const existItem=state.cartItems.find((x) => x._id === item._id);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id===existItem._id?item: x )
            }
            else{
                // add new cart item
                state.cartItems= [...state.cartItems, item]
            }
            // To update local storage we have updatecart in utils that will update local storage
            return updateCart(state,item);       
    },
    removeFromCart: (state, action) => {
        // if the id not equal to the one we want to delete
        state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
        // To update local storage we have updatecart in utils that will update local storage
        return updateCart(state);
      },
      saveShippingAddress:(state,action) =>{
        state.shippingAddress=action.payload;
        return updateCart(state);
      },
      savePaymentMethod:(state,action) =>{
        state.paymentMethod=action.payload;
        return updateCart(state);
      },
      clearCartItems: (state, action)=> {
        state.cartItems=[];
        // update the local storage
        return updateCart(state);

      }
}
});
// export action add to cart
export const { addToCart,removeFromCart, saveShippingAddress, savePaymentMethod,clearCartItems} = cartSlice.actions;
export default cartSlice.reducer;