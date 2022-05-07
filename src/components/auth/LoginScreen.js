import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm';
import './login.css'

const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginChange] = useForm({
        logEmail: '',
        logPassword: ''
    });

    const [formRegisterValues, handleRegisterChange] = useForm({
        regName: '',
        regEmail: '',
        regPassword: '',
        regPassword2: ''
    });

    const { logEmail, logPassword } = formLoginValues;
    const { regName, regEmail, regPassword, regPassword2 } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();

        dispatch(startLogin(logEmail, logPassword));
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if (regPassword !== regPassword2) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }

        dispatch(startRegister(regEmail, regPassword, regName));
    }

    return (
        <div className='container login-container'>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin} >
                        <div className='form-group mb-3'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Correo'
                                name='logEmail'
                                value={logEmail}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña'
                                name='logPassword'
                                value={logPassword}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='submit'
                                className='btnSubmit'
                                value='Ingresar'
                            />
                        </div>
                    </form>
                </div>

                <div className='col-md-6 login-form-2'>
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister} >
                        <div className='form-group mb-3'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Nombre'
                                name='regName'
                                value={regName}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Correo'
                                name='regEmail'
                                value={regEmail}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña'
                                name='regPassword'
                                value={regPassword}
                                onChange={handleRegisterChange}
                            />
                        </div>

                        <div className='form-group mb-3'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Repita la contraseña'
                                name='regPassword2'
                                value={regPassword2}
                                onChange={handleRegisterChange}
                            />
                        </div>

                        <div className='form-group'>
                            <input
                                type='submit'
                                className='btnSubmit'
                                value='Crear cuenta' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;