import React, { createContext, useReducer, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.user?.role);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user
            };
        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Check if token exists on load
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        console.log('Restoring from LocalStorage - Token:', !!token, 'Role:', role);
        if (token) {
            dispatch({ type: 'USER_LOADED', payload: { role } });
        } else {
            dispatch({ type: 'AUTH_ERROR' });
        }
    }, []);

    const login = async (formData) => {
        try {
            const res = await api.post('/auth/login', formData);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            });
        } catch (err) {
            console.error(err.response.data);
            throw err;
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
