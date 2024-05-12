import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './admin/components/layout/defaultLayout';
import Dashboard from './admin/pages/dashboard';
import AccountRoutes from './admin/routes/AccountRoutes';
import CustomerRoutes from './admin/routes/CustomerRoutes';
import UserRoutes from './admin/routes/UserRoures';
import OrderRoutes from './admin/routes/OrderRoutes';
import AuthService from './services/auth.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './admin/routes/AdminRoute';
import LoginForm from './admin/pages/Login';
import HomePage from './user/pages/Homepage';
import ForgotPasswordPage from './auth/pages/ForgotPasswordPage';
import ResetPasswordPage from './auth/pages/ResetPasswordPage';
import UserSearchPage from './user/pages/UserSearchPage';
import AuthProvider from './user/context/AuthContext';
import UserProfile from './user/pages/UserProfilePage';
import { UserDefaultLayout, UserHomeDefaultLayout } from './user/pages/layout/DefaultLayout';
import TestAPI from './user/pages/Test';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/homepage' element={<AuthProvider><UserHomeDefaultLayout><HomePage/></UserHomeDefaultLayout></AuthProvider>}/>
          <Route path='/search' element={<AuthProvider><UserHomeDefaultLayout><UserSearchPage/></UserHomeDefaultLayout></AuthProvider> }/>
          <Route path='/user/profile' element={<AuthProvider><UserDefaultLayout><UserProfile/></UserDefaultLayout></AuthProvider> }/>
          <Route path='/user/orders' element={<AuthProvider><UserDefaultLayout><UserProfile/></UserDefaultLayout></AuthProvider> }/>
          <Route path='/user/transactions' element={<AuthProvider><UserDefaultLayout><UserProfile/></UserDefaultLayout></AuthProvider> }/>
          <Route path='/user/wishlist' element={<AuthProvider><UserDefaultLayout><UserProfile/></UserDefaultLayout></AuthProvider> }/>
          <Route path='/forgotPassword' element={<ForgotPasswordPage/>} />
          <Route path='/reset-password' element={<ResetPasswordPage/>} />
          <Route path="/admin/login" element={<LoginForm />} />
          <Route path="/test" element={<TestAPI />} />
          <Route path="/admin/dashboard" element={<AdminRoute><DefaultLayout><Dashboard /></DefaultLayout></AdminRoute>} />
        </Routes>
        <UserRoutes/>
        <CustomerRoutes/>
        <AccountRoutes/>
        <OrderRoutes/>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
