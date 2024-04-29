import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './admin/components/layout/defaultLayout';
import Dashboard from './admin/pages/dashboard';
import Services from './components/pages/service/services';
import Accounts from './components/pages/account/accounts';
import AccountPackage from './components/pages/accountPackage/accountPackage';
import Customers from './admin/pages/customer/customers';
import Users from './components/pages/user/users';
import Orders from './order/order';
import OrderDetails from './order/orderDetails';
import LoginPage from './admin/pages/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DefaultLayout><Dashboard /></DefaultLayout>} />
          <Route path="/admin/service" element={<DefaultLayout><Services /></DefaultLayout>} />
          <Route path="/admin/orderList" element={<DefaultLayout><Orders /></DefaultLayout>} />
          <Route path="/admin/orderDetails" element={<DefaultLayout><OrderDetails /></DefaultLayout>} />
          <Route path="/admin/account" element={<DefaultLayout><Accounts /></DefaultLayout>} />
          <Route path="/admin/accountPackage" element={<DefaultLayout><AccountPackage /></DefaultLayout>} />
          <Route path="/admin/user" element={<DefaultLayout><Users /></DefaultLayout>} />
          <Route path="/admin/customer" element={<DefaultLayout><Customers /></DefaultLayout>} />
          <Route path="/admin/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
