import { UserProvider } from "../context/UserContext";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/layout/defaultLayout';
import Users from "../pages/user/Users";
import AdminRoute from './AdminRoute';

const UserRoutes = () => (
    <UserProvider>
      <Routes>
        <Route path="/admin/user" element={<AdminRoute><DefaultLayout> <UserProvider><Users /></UserProvider></DefaultLayout></AdminRoute> } />
      </Routes>
    </UserProvider>
  );
  
  export default UserRoutes;