import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoutes = () => {
    const { accessToken } = useContext(AuthContext);

    if (!accessToken) return <Navigate to='/login' />;

    return <Outlet />;
};

export default PrivateRoutes;
