import { CustomerProvider } from "../context/CustomerContext";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/layout/defaultLayout';
import Customers from "../pages/customer/Customers";

const CustomerRoutes = () => (
    <CustomerProvider>
      <Routes>
        <Route path="/admin/customer" element={<DefaultLayout> <CustomerProvider><Customers /></CustomerProvider></DefaultLayout>} />
      </Routes>
    </CustomerProvider>
  );
  
  export default CustomerRoutes;