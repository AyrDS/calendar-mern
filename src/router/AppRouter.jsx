import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage, Loader } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

   const { checkAuthToken, status } = useAuthStore();

   useEffect(() => {
      checkAuthToken();
   }, []);


   if (status === 'checking') {
      return (
         <Loader />
      )
   }

   return (
      <Routes>

         {
            (status === 'not-authenticated')
               ? (
                  <>
                     <Route path='/auth/*' element={<LoginPage />} />
                     <Route path='/*' element={<Navigate to='/auth/login' />} />
                  </>
               )
               : (
                  <>
                     <Route path='/' element={<CalendarPage />} />
                     <Route path='/*' element={<Navigate to='/' />} />
                  </>
               )
         }

      </Routes>
   )
}


/*  */
