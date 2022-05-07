import { useSelector, useDispatch } from 'react-redux';
import { startLogout } from '../../actions/authActions';

const Navbar = () => {

    const { name } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
    }

    return (
        <div className='navbar navbar-dark bg-dark mb-4' >
            <span className='navbar-brand ms-3'>
                {name}
            </span>

            <button className='btn btn-outline-danger me-3' onClick={handleLogout} >
                <i className='fas fa-sign-out-alt me-2' ></i>
                <span>
                    Salir
                </span>
            </button>
        </div>
    )
}

export default Navbar;