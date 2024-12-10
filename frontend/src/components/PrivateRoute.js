import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./ui/provider.jsx";

const PrivateRoute = ({ children }) => {
    const { authState } = useAuth();
    return authState.token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;