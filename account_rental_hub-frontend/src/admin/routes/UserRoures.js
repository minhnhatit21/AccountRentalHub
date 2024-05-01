import { UserProvider } from "../context/UserContext";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DefaultLayout from '../components/layout/defaultLayout';
import Users from "../pages/user/Users";

const UserRoutes = () => (
    <UserProvider>
      <Routes>
        <Route path="/admin/user" element={<DefaultLayout> <UserProvider><Users /></UserProvider></DefaultLayout>} />
      </Routes>
    </UserProvider>
  );
  
  export default UserRoutes;