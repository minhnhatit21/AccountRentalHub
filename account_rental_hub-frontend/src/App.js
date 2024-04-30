import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './admin/components/layout/defaultLayout';
import Dashboard from './admin/pages/dashboard';
import LoginPage from './admin/pages/login';
import AccountRoutes from './admin/routes/AccountRoutes';
import CustomerRoutes from './admin/routes/CustomerRoutes';
import UserRoutes from './admin/routes/UserRoures';
import OrderRoutes from './admin/routes/OrderRoutes';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/admin' element={<LoginPage/>} />
          <Route path="/admin/dashboard" element={<DefaultLayout><Dashboard /></DefaultLayout>} />
          <Route path="/admin/account/*" element={<AccountRoutes />} />
          <Route path="/admin/login" element={<LoginPage />} />
        </Routes>
        <UserRoutes/>
        <CustomerRoutes/>
        <AccountRoutes/>
        <OrderRoutes/>
      </Router>
    </div>
  );
}

export default App;
