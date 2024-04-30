import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/layout/defaultLayout';
import { OrderProvider } from "../context/OrderContext";
import Orders from "../pages/order/Order";
import OrderDetails from '../pages/order/OrderDetails';

const OrderRoutes = () => (
    <OrderProvider>
        <Routes>
            <Route path="/admin/orderList" element={<DefaultLayout><Orders /></DefaultLayout>} />
            <Route path="/admin/orderDetails" element={<DefaultLayout><OrderDetails /></DefaultLayout>} />
        </Routes>
    </OrderProvider>
);

export default OrderRoutes;