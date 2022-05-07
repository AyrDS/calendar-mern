import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isLoggedIn }) => {

    return isLoggedIn
        ? children
        : <Navigate to='/login' replace />
}

export default PrivateRoute;