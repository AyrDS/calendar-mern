import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './loginPage.css';

const loginFormFields = {
   loginEmail: '',
   loginPassword: '',
}

const registerFormFields = {
   registerName: '',
   registerEmail: '',
   registerPassword: '',
   registerPassword2: '',
}

export const LoginPage = () => {

   const { startLogin, errorMsg, startRegister } = useAuthStore();

   const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
   const { registerEmail, registerName, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

   useEffect(() => {
      if (errorMsg !== undefined) {
         Swal.fire('Error', errorMsg, 'error');
      }
   }, [errorMsg]);

   const loginSubmit = (e) => {
      e.preventDefault();
      startLogin({ email: loginEmail, password: loginPassword });
   }

   const registerSubmit = (e) => {
      e.preventDefault();
      if (registerPassword !== registerPassword2) {
         Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
         return;
      }

      if (registerPassword.length < 6) {
         Swal.fire('Error', 'La contraseña debe tener como mínimo 6 caracteres', 'error');
         return;
      }

      startRegister({ email: registerEmail, password: registerPassword, name: registerName });
   }


   return (
      <div className="container login-container">
         <div className="row">
            <div className="col-md-6 login-form-1">
               <h3>Ingreso</h3>
               <form onSubmit={loginSubmit} >
                  <div className="form-group mb-2">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Correo"
                        name='loginEmail'
                        value={loginEmail}
                        onChange={onLoginInputChange}
                     />
                  </div>
                  <div className="form-group mb-2">
                     <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name='loginPassword'
                        value={loginPassword}
                        onChange={onLoginInputChange}
                     />
                  </div>
                  <div className="form-group mb-2">
                     <input
                        type="submit"
                        className="btnSubmit"
                        value="Login"
                     />
                  </div>
               </form>
            </div>

            <div className="col-md-6 login-form-2">
               <h3>Registro</h3>
               <form onSubmit={registerSubmit} >
                  <div className="form-group mb-2">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name='registerName'
                        value={registerName}
                        onChange={onRegisterInputChange}
                     />
                  </div>
                  <div className="form-group mb-2">
                     <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        name='registerEmail'
                        value={registerEmail}
                        onChange={onRegisterInputChange}
                     />
                  </div>
                  <div className="form-group mb-2">
                     <input
                        type="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name='registerPassword'
                        value={registerPassword}
                        onChange={onRegisterInputChange}
                     />
                  </div>

                  <div className="form-group mb-2">
                     <input
                        type="password"
                        className="form-control"
                        placeholder="Repita la contraseña"
                        name='registerPassword2'
                        value={registerPassword2}
                        onChange={onRegisterInputChange}
                     />
                  </div>

                  <div className="form-group mb-2">
                     <input
                        type="submit"
                        className="btnSubmit"
                        value="Crear cuenta" />
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}