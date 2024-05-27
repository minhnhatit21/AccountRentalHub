import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import LoadingPage from '../pages/LoadingPage';

const UserRoute = ({ children }) => {
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser && currentUser.roles && currentUser.roles.includes("ROLE_USER")) {
          setIsUser(true);
        }
        setLoading(false);
      } catch (error) {
        setIsUser(false);
        setLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  if (loading) {
    return <LoadingPage/>;
  }

  return isUser ? children : <Navigate to="/homepage" replace />;
};

export default UserRoute;
