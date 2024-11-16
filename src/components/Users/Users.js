import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import the icons
import { getUsers, createUser, updateUser, deleteUser } from '../../services/api';
import './Users.css'; // Import the CSS file

const Users = () => {
    const [users, setUsers] = useState([]);
    const [userForm, setUserForm] = useState({ name: '', password: '', role: 'user' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            console.log('API Response:', response); // Debugging log
            const usersData = response.data?.$values || [];
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    };

    const handleInputChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateUser(editingUserId, userForm);
            } else {
                await createUser(userForm);
            }
            setUserForm({ name: '', password: '', role: 'user' });
            setIsEditing(false);
            fetchUsers();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEdit = (user) => {
        setUserForm(user);
        setIsEditing(true);
        setEditingUserId(user.id); // Assuming `id` is the identifier
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="users-container">
            <h2 className="users-heading">User Management</h2>
            <form className="user-form" onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={userForm.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                    className="user-input"
                />
                <input
                    name="password"
                    type="password"
                    value={userForm.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                    className="user-input"
                />
                <button type="submit" className="submit-btn">
                    {isEditing ? 'Update' : 'Add'} User
                </button>
            </form>

            <ul className="users-list">
                {users.map((user) => (
                    <li key={user.id} className="user-item">
                        <span> ID: {user.id} - {user.name} </span>
                        <div className="button-group">
                            <button
                                onClick={() => handleEdit(user)}
                                className="edit-btn"
                            >
                                <FaEdit /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="delete-btn"
                            >
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
