import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaUser, FaRegCreditCard, FaRegMoneyBillAlt } from 'react-icons/fa';
import Users from './components/Users/Users';
import Accounts from './components/Accounts/Accounts';
import Transactions from './components/Transactions/Transactions';
import './App.css';

function App() {
    return (
        <Router>
            <nav className="atm-nav">
                <Link to="/users" className="atm-nav-link">
                    <FaUser className="atm-nav-icon" />
                    <span>Users</span>
                </Link>
                <Link to="/accounts" className="atm-nav-link">
                    <FaRegCreditCard className="atm-nav-icon" />
                    <span>Accounts</span>
                </Link>
                <Link to="/transactions" className="atm-nav-link">
                    <FaRegMoneyBillAlt className="atm-nav-icon" />
                    <span>Transactions</span>
                </Link>
            </nav>
            <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/transactions" element={<Transactions />} />
            </Routes>
        </Router>
    );
}

export default App;
