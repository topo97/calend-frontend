import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, authSlice, calendarSlice } from './';


//NOTA: 
// recordar q siempre debe ir en la parte mas alta d la aplicacion para poder consumir el store !
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer,
    },
    
    // Config de middleware usando redux-toolkit
    middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
        serializableCheck: false
    })
});