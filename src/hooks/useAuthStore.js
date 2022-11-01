// interaccio de auth con el store
import {  useSelector } from 'react-redux';
import { calendarApi } from '../api';


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );


// proceso de Login-backend
    const startLogin = async({ email, password }) => {
        console.log({ email, password });


        //! entrada del backend:
        try {            
            const {data} = await calendarApi.post('/auth',{ email, password });
            console.log({ data });

        } catch (error) {
            console.log({error});
        }
    }

    return { 
        //* Propiedades
        status, 
        user,
        errorMessage,
        

        //* Metodos
        startLogin,
    }
}
