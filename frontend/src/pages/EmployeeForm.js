import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        department: '',
        salary: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    useEffect(() => {
        if (isEdit) {
            const fetchEmployee = async () => {
                try {
                    const res = await api.get('/employees');
                    const employee = res.data.find(emp => emp._id === id);
                    if (employee) {
                        setFormData({
                            firstName: employee.firstName,
                            lastName: employee.lastName,
                            email: employee.email,
                            position: employee.position,
                            department: employee.department,
                            salary: employee.salary
                        });
                    }
                } catch (err) {
                    console.error(err);
                }
            };
            fetchEmployee();
        }
    }, [isEdit, id]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            if (isEdit) {
                await api.put(`/employees/${id}`, formData);
            } else {
                await api.post('/employees', formData);
            }
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Error saving employee'); // Better error handling could be added
        }
    };

    return (
        <div className="form-container">
            <h2>{isEdit ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group-row">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={onChange} required />
                    </div>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Position</label>
                    <input type="text" name="position" value={formData.position} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <input type="text" name="department" value={formData.department} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Salary</label>
                    <input type="number" name="salary" value={formData.salary} onChange={onChange} required />
                </div>
                <button type="submit" className="btn-primary">{isEdit ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
