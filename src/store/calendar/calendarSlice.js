import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';
// import { useCalendarStore } from '../../hooks/useCalendarStore';


//! lOS EVENTOS DEBEN LLEGAR DEL STORE:
const  events = {
        _id: new Date().getTime(),  //lleva gion por config del backent.
        title: 'Cumpleños de Pelufo',
        notes: 'comprar reglos',
        start: new Date(),
        end: addHours( new Date(), 2 ),
        bgColor: '#fafafa',
        user: {
            _id:123,
            name: 'Juanma'
        }
};

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            events
        ],
        activeEvent: null

    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;

        },
        onAddNewEvent: ( state, { payload }) => {
            state.events.push( payload );  // envio la Nota y 
            state.activeEvent = null;       // limpio el evento activo, para esperar la proxima event
        
        },
        onUpdateEvent: ( state, { payload } ) => {
            //
            state.events = state.events.map( event => {
                if( event._id === payload._id ) {
                    return payload;
                }                
                
                return event;
            });
        },
            //eliminar notas,
            onDeleteEvent: ( state ) => {
                if ( state.activeEvent ) { //condicion para mis notas
                     //voy a regresar todos los eventos, cuyo id sea distinto de la nota activa.
                    state.events = state.events.filter( event => event._id !== state.activeEvent._id )
                    state.activeEvent = null;  // ninguna nota activa.
                }
            }
    }
});


// creo la accion del reducer
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;