// import {Link} from 'react-router-dom';
// import {Carousel, Image} from 'react-bootstrap';
// import Loader from './Loader';
// import Message from './Message';
// // import { useGetTopProductsQuery} from '../slices/productsApiSlice';
//  import React from 'react'
//  const ProductCarousel = () => {
//     // const { data: products, isLoading, error } = useGetTopProductsQuery();
  
//     return isLoading ? <Loader></Loader> : error ? (
//       <Message variant='danger'>{error?.data?.message || error.error}</Message>
//     ) : (
//       <Carousel pause='hover' className='bg-primary mb-4' style={{width:'50%', height: '50%'}}>
//         {products.map((product) => (
//           <Carousel.Item key={product._id}>
//             <Link to={`/product/${product._id}`}>
//               <Image src={product.image} alt={product.name} fluid />
//               <Carousel.Caption className='carousel-caption'style={{ fontSize: '18px' }}>
//                 <h2 className='text-white text-right'>
//                   {product.name} 
//                   {/* (Rs {product.price}) */}
//                 </h2>
//               </Carousel.Caption>
//             </Link>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     );
//   };
  
//   export default ProductCarousel;
 