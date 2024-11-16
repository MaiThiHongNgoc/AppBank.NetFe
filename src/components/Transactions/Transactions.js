import React, { useState, useEffect } from 'react';
import { getTransactions, createTransaction, deleteTransaction } from '../../services/api';
import { FiSearch, FiTrash, FiPlusCircle, FiInfo, FiX } from 'react-icons/fi'; // Importing icons
import './Transactions.css';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newTransaction, setNewTransaction] = useState({ accountId: '', amount: 0, description: '' });
    const [selectedTransaction, setSelectedTransaction] = useState(null); // State for modal

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await getTransactions();
            if (Array.isArray(response.data?.$values)) {
                setTransactions(response.data.$values);
            } else {
                console.error('Expected an array, but got:', response.data);
                setTransactions([]);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setTransactions([]);
        }
    };

    const handleCreateTransaction = async () => {
        try {
            await createTransaction(newTransaction);
            fetchTransactions();
            setNewTransaction({ accountId: '', amount: 0, description: '' });
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    const handleDeleteTransaction = async (id) => {
        try {
            await deleteTransaction(id);
            fetchTransactions();
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    const filteredTransactions = transactions.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectTransaction = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const handleCloseModal = () => {
        setSelectedTransaction(null);
    };

    return (
        <div className="transactions-page">
            <h2 className="transactions-header">Transactions</h2>

            {/* Search Bar */}
            {/* <div className="transactions-search-bar">
                <FiSearch className="search-icon" />
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search by description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div> */}

            {/* Transaction List */}
            <div className="transactions-list">
                {filteredTransactions.map(transaction => (
                    <div key={transaction.transactionId} className="transaction-item">
                        <p className="transaction-amount">Amount: {transaction.amount}</p>
                        <p className="transaction-description">Description: {transaction.description}</p>
                        <button className="transaction-detail-btn" onClick={() => handleSelectTransaction(transaction)}>
                            <FiInfo className="btn-icon" /> Details
                        </button>
                        <button className="transaction-delete-btn" onClick={() => handleDeleteTransaction(transaction.transactionId)}>
                            <FiTrash className="btn-icon" /> Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal for Transaction Details */}
            {selectedTransaction && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close-btn" onClick={handleCloseModal}>
                            <FiX />
                        </button>
                        <h3 className="modal-title">Transaction Details</h3>
                        <table className="modal-details-table">
                            <tbody>
                                <tr>
                                    <th>Transaction ID:</th>
                                    <td>{selectedTransaction.transactionId}</td>
                                </tr>
                                <tr>
                                    <th>Account ID:</th>
                                    <td>{selectedTransaction.accountId}</td>
                                </tr>
                                <tr>
                                    <th>Amount:</th>
                                    <td>{selectedTransaction.amount}</td>
                                </tr>
                                <tr>
                                    <th>Description:</th>
                                    <td>{selectedTransaction.description}</td>
                                </tr>
                                <tr>
                                    <th>Timestamp:</th>
                                    <td>{new Date(selectedTransaction.timestemp).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th>Is Successful:</th>
                                    <td>{selectedTransaction.isuccessful ? 'Yes' : 'No'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transactions;
