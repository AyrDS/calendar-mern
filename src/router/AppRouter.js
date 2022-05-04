import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<CalendarScreen />} />
                <Route path='/login' element={<LoginScreen />} />

                <Route path='/*' element={<Navigate to='/' replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;