import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/layout/defaultLayout';
import { OrderProvider } from "../context/OrderContext";
import Orders from "../pages/order/Order";
import OrderDetails from '../pages/order/OrderDetails';
import AdminRoute from './AdminRoute';

const OrderRoutes = () => (
    <OrderProvider>
        <Routes>
            <Route path="/admin/orderList" element={<AdminRoute><DefaultLayout><Orders /></DefaultLayout></AdminRoute> } />
            <Route path="/admin/orderDetails/:orderCode" element={<AdminRoute><DefaultLayout><OrderDetails /></DefaultLayout></AdminRoute> } />
        </Routes>
    </OrderProvider>
);

export default OrderRoutes;