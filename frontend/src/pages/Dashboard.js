import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const { user } = useContext(AuthContext);
    console.log('Dashboard User:', user); // Debug log

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        try {
            const res = await api.get('/employees');
            setEmployees(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteEmployee = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await api.delete(`/employees/${id}`);
                setEmployees(employees.filter(emp => emp._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Employee Dashboard</h2>
                {user && user.role === 'admin' && (
                    <Link to="/add-employee" className="btn-add">Add Employee</Link>
                )}
            </header>
            <div className="table-responsive">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.firstName} {employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{employee.position}</td>
                                <td>{employee.department}</td>
                                <td>₹{employee.salary}</td>
                                <td className="actions">
                                    {user && user.role === 'admin' ? (
                                        <>
                                            <Link to={`/edit-employee/${employee._id}`} className="btn-edit">Edit</Link>
                                            <button onClick={() => deleteEmployee(employee._id)} className="btn-delete">Delete</button>
                                        </>
                                    ) : (
                                        <span className="text-muted">View Only</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
