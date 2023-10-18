import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUser
} from '../redux/auth/authActions'
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getUser());
    }, []);
    
    if (user && isLoggedIn){
        return <Outlet/>    // returns child route elements
    }
    
    // show unauthorized screen if no user is found in redux store
    return (
        <Navigate to="/login"/> 
    )
}

export default ProtectedRoute;