import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NoAccessModal from '../components/NoAccessModal';

const PrivateRoute = ({ allowedRoles = [] }) => {
    const { authObject, loading } = useAuth();
    const role = authObject.role;
    const isAuthenticated = authObject.isAuthenticate;

    if (loading) {
        return <div>Cargando...</div>; 
    }

    if (!isAuthenticated) {

        return <Navigate to="/signIn/noAccess" replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        return <Navigate to="/signIn/noAccess" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;