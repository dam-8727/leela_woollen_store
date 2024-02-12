import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
// @paypal/react-paypal-js is a paypal package
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import {HelmetProvider} from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/bootstrap.custom.css';
import AdminRoute from './components/AdminRoute'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import './assets/index.css'
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/ OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
    <Route index={true} path='/' element={<HomeScreen />}></Route>
    <Route  path='/search/:keyword' element={<HomeScreen />}></Route>
    <Route  path='/page/:pageNumber' element={<HomeScreen />}></Route>
    <Route  path='/search/:keyword/page/:pageNumber' element={<HomeScreen />}></Route>
    <Route path='/product/:id' element={<ProductScreen />}></Route>
    <Route path='/cart' element={<CartScreen />}></Route>
    <Route path='/login' element={<LoginScreen />}></Route>
    <Route path='/register' element={<RegisterScreen />}></Route>
    <Route path='/shipping' element={<ShippingScreen />}></Route>
    {/* Above all are public routes to make route private we use another route as shown below */}
    <Route path='' element={<PrivateRoute></PrivateRoute>}>
      <Route path='/shipping'element={<ShippingScreen />}></Route>
      <Route path='/payment' element={<PaymentScreen />} />
      <Route path='/placeorder' element={<PlaceOrderScreen />} />
      <Route path='/order/:id' element={<OrderScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
    </Route>
    {/* admin routes */}
    <Route path='' element={<AdminRoute></AdminRoute>}>
      <Route path='/admin/orderList'element={< OrderListScreen/>}></Route>
      <Route path='/admin/productList'element={< ProductListScreen/>}></Route>
      <Route path='/admin/productList/:pageNumber'element={< ProductListScreen/>}></Route>
      <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
      <Route path='/admin/userList' element={<UserListScreen />} />
      <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
    </Route>
    
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
      {/* put paypal provider inside the redux provider */}
      <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={router}></RouterProvider>
    </PayPalScriptProvider>
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
