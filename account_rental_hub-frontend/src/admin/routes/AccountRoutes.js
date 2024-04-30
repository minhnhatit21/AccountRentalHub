import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/layout/defaultLayout';
import Accounts from '../pages/account/Accounts';
import AccountPackage from '../pages/accountPackage/AccountPackage';
import Services from '../pages/service/Services';
import { AccountProvider } from '../context/AccountContext';


const AccountRoutes = () => (
  <AccountProvider>
    <Routes>
      <Route path="/admin/account/list" element={<DefaultLayout><Accounts /></DefaultLayout>} />
      <Route path="/admin/account/accountPackage" element={<DefaultLayout><AccountPackage /></DefaultLayout>} />
      <Route path="/admin/account/service" element={<DefaultLayout> <AccountProvider><Services /></AccountProvider></DefaultLayout>} />
    </Routes>
  </AccountProvider>
);

export default AccountRoutes;