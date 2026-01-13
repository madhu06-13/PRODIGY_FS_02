import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        role: 'user', // default role
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const { username, role, email, password, confirmPassword } = formData;

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Register
            await api.post('/auth/register', {
                username,
                password,
                role
            });

            alert('Registration successful. Please login.');
            navigate('/login'); 
        } catch (err) {
            alert(err.response?.data?.msg || 'Registration failed');
        }
    };
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={onSubmit}>
                <h2>User Registration</h2>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <select
                        name="role"
                        value={role}
                        onChange={onChange}
                        className="select-input"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

             <div className="form-group">
             <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        required
                    />
                </div>

                <button type="submit" className="btn-primary">
                    Register
                </button>

                <p style={{ marginTop: '10px' }}>
                    Already have an account? <Link to="/login-user">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
