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
import CartPage from './user/pages/CartPage';
import PaymentPage from './user/pages/PaymentPage';
import ProductPage from './user/pages/ProductPage';
import { GlobalProvider } from './admin/context/GlobalContext';
import { TransactionProvider } from './admin/context/TransactionContext';
import Transactions from './admin/pages/transaction/Transaction';
import ProfileMenuDropdown from './admin/components/dropdown/profile_dropdown';
import { OrderProvider } from './admin/context/OrderContext';
import UserOrderDetails from './user/pages/UserOrderDetailsPage';
import { HomePageProvider } from './user/context/HomePageContext';
import { OrderUserContext, OrderUserProvider } from './user/context/UserOderHistoryContext';
import { TransactionUserProvider } from './user/context/UserTransactionContext';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path='/' element={<UserHomeDefaultLayout><HomePageProvider><HomePage/></HomePageProvider></UserHomeDefaultLayout>} />
              <Route path='/home' element={ <UserHomeDefaultLayout><HomePageProvider><HomePage/></HomePageProvider></UserHomeDefaultLayout>} />
              <Route path='/search' element={<UserHomeDefaultLayout><UserSearchPage /></UserHomeDefaultLayout>} />
              <Route path='/user/cart' element={<CartDefaultLayout><CartPage /></CartDefaultLayout>} />
              <Route path='/user/payment' element={<CartDefaultLayout><PaymentPage /></CartDefaultLayout>} />
              <Route path='/user/profile' element={<UserDefaultLayout><UserProfile /></UserDefaultLayout>} />
              <Route path='/user/orders' element={<UserDefaultLayout><OrderUserProvider><OrderHistoryPage /></OrderUserProvider> </UserDefaultLayout>} />
              <Route path='/user/orderDetails/:orderCode' element={<UserDefaultLayout><OrderProvider><UserOrderDetails /></OrderProvider> </UserDefaultLayout>} />
              <Route path='/user/transactions' element={<UserDefaultLayout><TransactionUserProvider><TransactionHistoryPage /></TransactionUserProvider> </UserDefaultLayout>} />
              <Route path='/user/product/:serviceName' element={<UserHomeDefaultLayout><HomePageProvider><ProductPage /></HomePageProvider></UserHomeDefaultLayout>} />
              <Route path='/user/wishlist' element={<UserDefaultLayout><UserProfile /></UserDefaultLayout>} />
              <Route path='/forgotPassword' element={<ForgotPasswordPage />} />
              <Route path='/reset-password' element={<ResetPasswordPage />} />
              <Route path="/admin/login" element={<LoginForm />} />
              <Route path="/test" element={<TestAPI />} />
              <Route path="/admin/dashboard" element={<AdminRoute><DefaultLayout><Dashboard /></DefaultLayout></AdminRoute>} />
              <Route path='/admin/account/accountPackage' element={<AdminRoute><AccountPackageProvider><DefaultLayout><AccountPackage /></DefaultLayout></AccountPackageProvider></AdminRoute>} />
              <Route path="/admin/account/service" element={<AdminRoute><AccountServiceProvider><DefaultLayout><Services /></DefaultLayout></AccountServiceProvider></AdminRoute>} />
              <Route path="/admin/transaction" element={<AdminRoute><TransactionProvider><DefaultLayout><Transactions /></DefaultLayout></TransactionProvider></AdminRoute>} />
            </Routes>
            <UserRoutes />
            <CustomerRoutes />
            <AccountRoutes />
            <OrderRoutes />
          </Router>
        </AuthProvider>
      </GlobalProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
