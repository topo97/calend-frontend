import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent,  onUpdateEvent } from '../store';


// mi CustomHook
export const useCalendarStore = () => {

    const dispatch = useDispatch();

    //! useSelector=> permite enviar los eventos a mis componentes.
    const { events, activeEvent } = useSelector( state => state.calendar );
    
    // llama al dispatch d mi accion
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );

    }

    //NOTA:  no uso thunks, esta ves, solo disparo acciones asincronas:
    const startSavingEvent = async( calendarEvent ) => {

        // Todo bien
        if( calendarEvent._id ) { // Actualizando= si trae id
            dispatch( onUpdateEvent({ ...calendarEvent}) );
        } else {                
            //  Creando  
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
    }

    const startDeleteEvent = () => {  // btn eliminar, solo envio la accion.
        // Todo: llegr al backend
        
        dispatch( onDeleteEvent() );
    }


    return {
        // * Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,  // condicion: si recivo un event, activo btn a true. Sino es null.

        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        
    }
}
