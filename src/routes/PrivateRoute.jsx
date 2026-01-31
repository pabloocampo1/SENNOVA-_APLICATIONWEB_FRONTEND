import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ allowedRoles = [] }) => {
    const { authObject, loading } = useAuth();
    const role = authObject.role;
    const isAuthenticated = authObject.isAuthenticate;

    if (loading) return <div>Cargando...</div>;
    if (!isAuthenticated) return <Navigate to="/signIn" replace />;

    const isSuperAdmin = role === "ROLE_SUPERADMIN";
    const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(role);

    if (isSuperAdmin || hasAccess) {
        return <Outlet />;
    }

    return <Navigate to="/no-access-role" replace />;
};

export default PrivateRoute;
