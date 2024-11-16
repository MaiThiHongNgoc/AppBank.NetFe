import axios from 'axios';

const API_URL = 'http://localhost:5168/api'; // Replace with your API URL

export const getUsers = () => axios.get(`${API_URL}/user`);
export const getUser = (id) => axios.get(`${API_URL}/user/${id}`);
export const createUser = (user) => axios.post(`${API_URL}/user`, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/user/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/user/${id}`);

// Similar setup for accounts and transactions
export const getAccounts = () => axios.get(`${API_URL}/account`);
export const getAccount = (id) => axios.get(`${API_URL}/account/${id}`);
export const createAccount = (account) => axios.post(`${API_URL}/account`, account);
export const updateAccount = (id, account) => axios.put(`${API_URL}/account/${id}`, account);
export const deleteAccount = (id) => axios.delete(`${API_URL}/account/${id}`);
export const depositToAccount = (id, amount) => axios.post(`${API_URL}/account/${id}/deposit`, { amount });
export const withdrawFromAccount = (id, amount) => axios.post(`${API_URL}/account/${id}/withdraw`, { amount });

// Transactions
export const getTransactions = () => axios.get(`${API_URL}/transaction`);
export const getTransaction = (id) => axios.get(`${API_URL}/transaction/${id}`);
export const createTransaction = (transaction) => axios.post(`${API_URL}/transaction`, transaction);
export const updateTransaction = (id, transaction) => axios.put(`${API_URL}/transaction/${id}`, transaction);
export const deleteTransaction = (id) => axios.delete(`${API_URL}/transaction/${id}`);
