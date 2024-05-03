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
import UserRoute from './user/routes/UserRoute';
import ForgotPasswordPage from './auth/pages/ForgotPasswordPage';
import ResetPasswordPage from './auth/pages/ResetPasswordPage';

function App() {

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/homepage' element={<UserRoute><HomePage/></UserRoute> }/>
          <Route path='/forgotPassword' element={<ForgotPasswordPage/>} />
          <Route path='/reset-password' element={<ResetPasswordPage/>} />
          <Route path="/admin/login" element={<LoginForm />} />
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
