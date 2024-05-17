import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/layout/defaultLayout';
import Accounts from '../pages/account/Accounts';
import AccountPackage from '../pages/accountPackage/AccountPackage';
import Services from '../pages/service/Services';
import { AccountProvider } from '../context/AccountContext';
import AdminRoute from './AdminRoute';


const AccountRoutes = () => (
  <AccountProvider>
    <Routes>
      <Route path="/admin/account/list" element={<AdminRoute><DefaultLayout><Accounts /></DefaultLayout></AdminRoute>} />
    </Routes>
  </AccountProvider>

);

export default AccountRoutes;