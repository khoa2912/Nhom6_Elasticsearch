import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({children }) => {
        const token = window.localStorage.getItem('token');
        return token? children: <Navigate to={"/sign-in"} /> 
}

export default PrivateRoute