import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/layout/defaultLayout';

import { AccountProvider } from '../context/AccountContext';
import AdminRoute from './AdminRoute';
import { AccountSlotProvider } from '../context/AccountSlotContext';
import { GlobalProvider } from '../context/GlobalContext';
import Account from '../pages/account/Account';


const AccountRoutes = () => (
  <AccountProvider>
    <Routes>
      <Route path="/admin/account/list" element={<AdminRoute><AccountSlotProvider><DefaultLayout><Account /></DefaultLayout></AccountSlotProvider> </AdminRoute>} />
    </Routes>
  </AccountProvider>

);

export default AccountRoutes;