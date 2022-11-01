import { Route, Routes, Navigate } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';


export const AppRouter = () => {
    
    const authStatus = 'not-authenticated';  // 'authenticated': // no-authenticated

    
    return (
        <Routes>
            {
                ( authStatus === 'not-authenticated' )
                    ? <Route path="/auth/*" element={ <LoginPage /> } /> //no estoy autenticado, muestro el Login.
                    :<Route path="/*"  element={ <CalendarPage /> } /> // estoy logeado y muestro el calendario.
            }

            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        </Routes>
    )
}
