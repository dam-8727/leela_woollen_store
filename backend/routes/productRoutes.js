import express from 'express';
const router = express.Router();

// import products from '../data/products.js';
// import asyncHandler from '../middleware/asyncHandler.js';
// import Product from '../models/productModel.js';
import {getProducts, getProductById,createProduct, updateProduct,deleteProduct, createProductReview} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js';
//api call
 router.route('/').get(getProducts).post(protect, admin, createProduct);
 router.route('/:id/reviews').post(protect, createProductReview);
 router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect,admin,deleteProduct);

export default router;