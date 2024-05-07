import React from 'react';
import Navigation from '../customer/components/Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';
import Footer from '../customer/components/Footer/footer';
import Product from '../customer/components/Product/Product';
import HomePage from '../customer/pages/HomePage/HomePage';
import ProductDetails from '../customer/components/ProductDetails/ProductDetails';
import Cart from '../customer/components/Cart/Cart';
import Checkout from '../customer/components/Checkout/Checkout';
import Order from '../customer/components/Order/Order';
import OrderDetails from '../customer/components/Order/OrderDetails';

const CustomerRouters = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<HomePage />} />
                <Route path='/register' element={<HomePage />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/:topLevel/:secondLevel/:thirdLevel' element={<Product />} />
                <Route path='/product/:productId' element={<ProductDetails />} />
                <Route path='/account/order' element={<Order />} />
                <Route path='/account/order/:orderId' element={<OrderDetails />} />
                <Route path='/checkout' element={<Checkout />} />
            </Routes>
            <div>
                <Footer/>
            </div>
        </div>
    );
}

export default CustomerRouters;