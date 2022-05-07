import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/authActions';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';


const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);


    if (checking) {
        return <h5>Espere por favor...</h5>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <PrivateRoute isLoggedIn={!!uid} >
                        <CalendarScreen />
                    </PrivateRoute>
                } />
                <Route path='/login' element={
                    <PublicRoute isLoggedIn={!!uid} >
                        <LoginScreen />
                    </PublicRoute>
                } />

                <Route path='/*' element={<Navigate to='/' replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;