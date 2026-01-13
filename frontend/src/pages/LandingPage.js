import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1>Welcome to Employee Management System</h1>
                <p>A mini project for managing employees efficiently</p>
                <div className="role-buttons" style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Link to="/login" className="btn-primary">Login</Link>
                    <Link to="/register" className="btn-primary">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
