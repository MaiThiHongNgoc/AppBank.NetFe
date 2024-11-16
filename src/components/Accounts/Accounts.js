import React, { useState, useEffect } from 'react';
import { 
    getAccounts, 
    createAccount, 
    updateAccount, 
    deleteAccount, 
    depositToAccount, 
    withdrawFromAccount 
} from '../../services/api';
import { FiPlus, FiEdit, FiTrash, FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import './Accounts.css';

function Accounts() {
    const [accounts, setAccounts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newAccount, setNewAccount] = useState({
        userId: '',
        type: 'Checking', // Checking = 0, Saving = 1
        balance: 0,
        interestRate: 0,
        startDate: '',
        endDate: ''
    });
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await getAccounts();
            setAccounts(response.data?.$values || []);
        } catch (error) {
            console.error('Error fetching accounts:', error);
            setAccounts([]);
        }
    };

    const handleCreateAccount = async () => {
        try {
            const payload = {
                userId: parseInt(newAccount.userId),
                type: newAccount.type === 'Checking' ? 0 : 1,
                balance: parseFloat(newAccount.balance),
                interestRate: parseFloat(newAccount.interestRate),
                startDate: new Date(newAccount.startDate).toISOString(),
                endDate: new Date(newAccount.endDate).toISOString()
            };

            await createAccount(payload);
            fetchAccounts();
            setNewAccount({
                userId: '',
                type: 'Checking',
                balance: 0,
                interestRate: 0,
                startDate: '',
                endDate: ''
            });
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    const handleUpdateAccount = async () => {
        try {
            await updateAccount(selectedAccount.accountId, selectedAccount);
            fetchAccounts();
            setSelectedAccount(null);
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };

    const handleDeleteAccount = async (id) => {
        try {
            await deleteAccount(id);
            fetchAccounts();
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleDeposit = async (id) => {
        try {
            await depositToAccount(id, amount);
            fetchAccounts();
            setAmount(0);
        } catch (error) {
            console.error('Error depositing money:', error);
        }
    };

    const handleWithdraw = async (id) => {
        try {
            await withdrawFromAccount(id, amount);
            fetchAccounts();
            setAmount(0);
        } catch (error) {
            console.error('Error withdrawing money:', error);
        }
    };

    const filteredAccounts = accounts.filter(account =>
        account.userId.toString().includes(searchTerm)
    );

    return (
        <div className="accounts-container">
            <h2>Accounts</h2>
            {/* <input
                type="text"
                placeholder="Search by User ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            /> */}
            <div className="create-account-container">
                <input
                    type="text"
                    placeholder="User ID"
                    value={newAccount.userId}
                    onChange={(e) => setNewAccount({ ...newAccount, userId: e.target.value })}
                    className="account-input"
                />
                <select
                    value={newAccount.type}
                    onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value })}
                    className="account-type-select"
                >
                    <option value="Checking">Checking</option>
                    <option value="Saving">Saving</option>
                </select>
                <input
                    type="number"
                    placeholder="Balance"
                    value={newAccount.balance}
                    onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
                    className="account-input"
                />
                <input
                    type="number"
                    placeholder="Interest Rate"
                    value={newAccount.interestRate}
                    onChange={(e) => setNewAccount({ ...newAccount, interestRate: e.target.value })}
                    className="account-input"
                />
                <input
                    type="date"
                    placeholder="Start Date"
                    value={newAccount.startDate}
                    onChange={(e) => setNewAccount({ ...newAccount, startDate: e.target.value })}
                    className="account-input"
                />
                <input
                    type="date"
                    placeholder="End Date"
                    value={newAccount.endDate}
                    onChange={(e) => setNewAccount({ ...newAccount, endDate: e.target.value })}
                    className="account-input"
                />
                <button onClick={handleCreateAccount} className="btn-create-account">
                    <FiPlus /> Create Account
                </button>
            </div>

            {filteredAccounts.map(account => (
                <div key={account.accountId} className="account-card">
                    <p>Account ID: {account.accountId}</p>
                    <p>User ID: {account.userId}</p>
                    <p>Type: {account.type === 0 ? 'Checking' : 'Saving'}</p>
                    <p>Balance: {account.balance}</p>
                    <p>Start Date: {new Date(account.startDate).toLocaleDateString()}</p>
                    <p>End Date: {new Date(account.endDate).toLocaleDateString()}</p>
                    <p>Interest Rate: {account.interestRate}%</p>

                    <button onClick={() => setSelectedAccount(account)} className="btn-edit">
                        <FiEdit /> Edit
                    </button>
                    <button onClick={() => handleDeleteAccount(account.accountId)} className="btn-delete">
                        <FiTrash /> Delete
                    </button>

                    <div className="transaction-container">
                        <input
                            type="number"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) => setAmount(parseFloat(e.target.value))}
                            className="transaction-input"
                        />
                        <button onClick={() => handleDeposit(account.accountId)} className="btn-deposit">
                            <FiArrowUpCircle /> Deposit
                        </button>
                        <button onClick={() => handleWithdraw(account.accountId)} className="btn-withdraw">
                            <FiArrowDownCircle /> Withdraw
                        </button>
                    </div>
                </div>
            ))}

            {selectedAccount && (
                <div className="edit-account-container">
                    <h3>Edit Account</h3>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={selectedAccount.userId}
                        onChange={(e) => setSelectedAccount({ ...selectedAccount, userId: e.target.value })}
                        className="account-input"
                    />
                    <select
                        value={selectedAccount.type}
                        onChange={(e) => setSelectedAccount({ ...selectedAccount, type: e.target.value })}
                        className="account-type-select"
                    >
                        <option value="Checking">Checking</option>
                        <option value="Saving">Saving</option>
                    </select>
                    <button onClick={handleUpdateAccount} className="btn-update-account">
                        <FiEdit /> Update Account
                    </button>
                </div>
            )}
        </div>
    );
}

export default Accounts;
