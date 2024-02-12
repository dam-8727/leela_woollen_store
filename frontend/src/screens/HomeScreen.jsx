// import{useEffect, useState} from'react';
import React from 'react'
import {useParams} from 'react-router-dom'
// import{Link} from'react-router-dom';
import {Row, Col} from 'react-bootstrap'
//import products from '../products'
import Product from '../components/Product'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
//  import axios from 'axios';
import { useGetProductsQuery } from '../slices/productsApiSlice';

// import Meta from '../components/Meta';

const HomeScreen = () => {
  // get the page number from url and then pass it in
  const {pageNumber,keyword}=useParams();
  const { data, isLoading, error} = useGetProductsQuery({keyword,pageNumber});

  // const [products, setProducts]=useState([]);

  // useEffect(() =>{
  //   const FetchProducts= async() =>{
  //     const{data} = await axios.get('/api/products');
  //     setProducts(data);
  //   };
  //   FetchProducts();
  // },[]);
  return (
    <>
   
     { isLoading? (<Loader/>): error ? (
      <Message varient='danger'> {error?.data?.message || error?.error}</Message>
     ):(
      <>
      <h1>Latest Products</h1>
      <Row>
        
           {data.products.map(
                (product)=> (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Product key={product._id} product={product} />
                        {product.name}
                    </Col>
                )
            )
        }
      </Row>
      <Paginate
      pages={data.pages}
      page={data.page}
      keyword={keyword ? keyword : ''}
      />
      </>
     )}

    </>
  )
}

export default HomeScreen
