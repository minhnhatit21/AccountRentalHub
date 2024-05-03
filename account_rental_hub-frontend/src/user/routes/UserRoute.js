import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const UserRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser && currentUser.roles && currentUser.roles.includes("ROLE_USER")) {
          setIsAdmin(true);
        }
        setLoading(false);
      } catch (error) {
        setIsAdmin(false);
        setLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

export default UserRoute;
