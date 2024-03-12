import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


export const protectedRoute = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const { isLoggedIn } = useSelector(state => state.appReducer);

        useEffect(() => {
            if (!isLoggedIn) {
                // Redirect to login page if user is not logged in
                navigate('/login');
            }
        }, [isLoggedIn, navigate]);

        // Render the wrapped component if user is logged in
        return isLoggedIn ? <WrappedComponent {...props} /> : null;
    };

};