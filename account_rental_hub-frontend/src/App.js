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
import { CartDefaultLayout, UserDefaultLayout, UserHomeDefaultLayout } from './user/pages/layout/DefaultLayout';
import TestAPI from './user/pages/Test';
import { AccountPackageProvider } from './admin/context/AccountPackageContext';
import AccountPackage from './admin/pages/accountPackage/AccountPackage';
import { AccountServiceProvider } from './admin/context/AccountServiceContext';
import Services from './admin/pages/service/Services';
import OrderHistoryPage from './user/pages/OrderHistoryPage';
import TransactionHistoryPage from './user/pages/TransactionHistoryPage';
import CartEmpty from './user/pages/CartPage';
import CartPage from './user/pages/CartPage';
import PaymentPage from './user/pages/PaymentPage';
import ProductPage from './user/pages/ProductPage';
import { GlobalProvider } from './admin/context/GlobalContext';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Router>
          <Routes>
            <Route path='/' element={<AuthProvider><UserHomeDefaultLayout><HomePage /></UserHomeDefaultLayout></AuthProvider>} />
            <Route path='/home' element={<AuthProvider><UserHomeDefaultLayout><HomePage /></UserHomeDefaultLayout></AuthProvider>} />
            <Route path='/search' element={<AuthProvider><UserHomeDefaultLayout><UserSearchPage /></UserHomeDefaultLayout></AuthProvider>} />
            <Route path='/user/cart' element={<AuthProvider><CartDefaultLayout><CartPage /></CartDefaultLayout></AuthProvider>} />
            <Route path='/user/payment' element={<AuthProvider><CartDefaultLayout><PaymentPage /></CartDefaultLayout></AuthProvider>} />
            <Route path='/user/profile' element={<AuthProvider><UserDefaultLayout><UserProfile /></UserDefaultLayout></AuthProvider>} />
            <Route path='/user/orders' element={<AuthProvider><UserDefaultLayout><OrderHistoryPage /></UserDefaultLayout></AuthProvider>} />
            <Route path='/user/transactions' element={<AuthProvider><UserDefaultLayout><TransactionHistoryPage /></UserDefaultLayout></AuthProvider>} />
            <Route path='/user/product' element={<AuthProvider><UserHomeDefaultLayout><ProductPage /></UserHomeDefaultLayout></AuthProvider>} />
            <Route path='/user/wishlist' element={<AuthProvider><UserDefaultLayout><UserProfile /></UserDefaultLayout></AuthProvider>} />
            <Route path='/forgotPassword' element={<ForgotPasswordPage />} />
            <Route path='/reset-password' element={<ResetPasswordPage />} />
            <Route path="/admin/login" element={<LoginForm />} />
            <Route path="/test" element={<TestAPI />} />
            <Route path="/admin/dashboard" element={<AdminRoute><DefaultLayout><Dashboard /></DefaultLayout></AdminRoute>} />
            <Route path='/admin/account/accountPackage' element={<AdminRoute><AccountPackageProvider><DefaultLayout><AccountPackage /></DefaultLayout></AccountPackageProvider></AdminRoute>} />
            <Route path="/admin/account/service" element={<AdminRoute><AccountServiceProvider><DefaultLayout><Services /></DefaultLayout></AccountServiceProvider></AdminRoute>} />
          </Routes>
          <UserRoutes />
          <CustomerRoutes />
          <AccountRoutes />
          <OrderRoutes />
        </Router>
      </GlobalProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
