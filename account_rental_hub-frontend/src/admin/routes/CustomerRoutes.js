import { CustomerProvider } from "../context/CustomerContext";
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import DefaultLayout from '../components/layout/defaultLayout';
import Customers from "../pages/customer/Customers";
import AdminRoute from './AdminRoute';

const CustomerRoutes = () => (
    <CustomerProvider>
      <Routes>
        <Route path="/admin/customer" element={<AdminRoute><DefaultLayout> <CustomerProvider><Customers /></CustomerProvider></DefaultLayout></AdminRoute> } />
      </Routes>
    </CustomerProvider>
  );
  
  export default CustomerRoutes;