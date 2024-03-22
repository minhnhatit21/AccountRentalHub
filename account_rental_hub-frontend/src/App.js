import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './components/layout/defaultLayout';
import Dashboard from './components/pages/dashboard';
import Services from './components/pages/service/services';
import Orders from './components/pages/orders';
import Accounts from './components/pages/accounts';
import Users from './components/pages/users'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DefaultLayout><Dashboard /></DefaultLayout>} />
          <Route path="/service" element={<DefaultLayout><Services /></DefaultLayout>} />
          <Route path="/order" element={<DefaultLayout><Orders /></DefaultLayout>} />
          <Route path="/account" element={<DefaultLayout><Accounts /></DefaultLayout>} />
          <Route path="/user" element={<DefaultLayout><Users /></DefaultLayout>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
