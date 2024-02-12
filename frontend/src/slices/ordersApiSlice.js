// we have created order endpoints in backend now we are going to implement in frontend

// bring parent of initial Api slice
import{apiSlice} from './apiSlice';
import {ORDERS_URL,PAYPAL_URL} from '../constants';
// we are injecting to api slice which are are connected to store.js

export const ordersApiSlice=apiSlice.injectEndpoints({
    endpoints: (builder) =>( {
        createOrder:builder.mutation({
            query: (order) =>({
                url:ORDERS_URL,
                method:'POST',
                body:order,
            }),
        }),
        getOrderDetails:builder.query({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
              }),
              keepUnusedDataFor: 5,
            }),
            payOrder: builder.mutation({
                query: ({ orderId, details }) => ({
                  url: `${ORDERS_URL}/${orderId}/pay`,
                  method: 'PUT',
                  body: details,
                }),
              }),
              getPaypalClientId: builder.query({
                query: () => ({
                  url: PAYPAL_URL,
                }),
                keepUnusedDataFor: 5,
              }),
              getMyOrders: builder.query({
                query: () => ({
                  url: `${ORDERS_URL}/mine`,
                }),
                keepUnusedDataFor: 5,
              }),
              getOrders:builder.query({
                query:()=>({
                  url:ORDERS_URL,
                }),
                keepUnusedDataFor:5,
              }),
              // mutation coz we are changing status
              // mutation is used where we are changing something
              deliverOrder: builder.mutation({
                query:(orderId) => ({
                  url: `${ORDERS_URL}/${orderId}/deliver`,
                  method:'PUT',
                })
             
              })



        }),
        
        });
  

export const{useCreateOrderMutation,
    useGetOrderDetailsQuery,usePayOrderMutation,
    useGetPaypalClientIdQuery,useGetMyOrdersQuery, useGetOrdersQuery,
    useDeliverOrderMutation
    }=ordersApiSlice;