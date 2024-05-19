import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/layout/defaultLayout';
import Accounts from '../pages/account/Accounts';

import { AccountProvider } from '../context/AccountContext';
import AdminRoute from './AdminRoute';
import { AccountSlotProvider } from '../context/AccountSlotContext';


const AccountRoutes = () => (
  <AccountProvider>
    <Routes>
      <Route path="/admin/account/list" element={<AdminRoute><AccountSlotProvider><DefaultLayout><Accounts /></DefaultLayout></AccountSlotProvider> </AdminRoute>} />
    </Routes>
  </AccountProvider>

);

export default AccountRoutes;