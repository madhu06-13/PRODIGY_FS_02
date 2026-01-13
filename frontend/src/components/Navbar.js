import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <h1 className="logo">Employee Management System</h1>
            <ul>
                {isAuthenticated ? (
                    <>
                        {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
                        {user && user.role === 'admin13' && (
                            <li><Link to="/add-employee">Add Employee</Link></li>
                        )}
                        <li><button onClick={onLogout} className="btn-logout">Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/">Home</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
