import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/layout/defaultLayout';
import Dashboard from './components/pages/dashboard';
import Services from './components/pages/service/services';
import Orders from './components/pages/orders';
import Accounts from './components/pages/account/accounts';
import AccountPackage from './components/pages/accountPackage/accountPackage';
import Customers from './components/pages/customer/customers';
import Users from './components/pages/user/users';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DefaultLayout><Dashboard /></DefaultLayout>} />
          <Route path="/service" element={<DefaultLayout><Services /></DefaultLayout>} />
          <Route path="/order" element={<DefaultLayout><Orders /></DefaultLayout>} />
          <Route path="/account" element={<DefaultLayout><Accounts /></DefaultLayout>} />
          <Route path="/accountPackage" element={<DefaultLayout><AccountPackage /></DefaultLayout>} />
          <Route path="/user" element={<DefaultLayout><Users /></DefaultLayout>} />
          <Route path="/customer" element={<DefaultLayout><Customers /></DefaultLayout>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
