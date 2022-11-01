import { useState } from 'react';
import { Calendar } from 'react-big-calendar'; // dateFnsLocalizer, permite escojer el idioma.
import 'react-big-calendar/lib/css/react-big-calendar.css'; //css calendar

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';


export const CalendarPage = () => {

    //! los metodos son llamados por el event.
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent } = useCalendarStore();  // el coostomHook, nos facilita el dispatch d las accion. 
    const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week')


    const eventStyleGetter = ( event, start, end, isSelected ) => {
        // console.log( {event, start, end, isSelected });
        
        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',

        }
        return {
            style
        };

    };

    // EVENTOS:
    // doble clickpara abrir modal.
    const onDobleClick = ( event ) => {
        // console.log({ onDobleClick: event });
        openDateModal(); 
    } 

    const onSelect = ( event ) => {
        setActiveEvent( event );
    } 

    // al cambiar de vista, al event lo guardo en LocalStorage.
    const onViewChanged = ( event ) => {
        localStorage.setItem('lastView', event );
        setLastView( event );

    }

    return (
        <>
            <Navbar/>
    
            <Calendar
                culture='en' // meses y dias en español.
                localizer={ localizer }
                events={ events }
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={ getMessagesES() }
                    // eventos: como los dirparo en el calendario?
                eventPropGetter={ eventStyleGetter }

                components={{
                    event: CalendarEvent  // no lo creo, lo llamo unicamente.
                }}
                onDoubleClickEvent={ onDobleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChanged }
            
            />
                <CalendarModal />

                <FabAddNew /> {/* BTN + */}
                
                <FabDelete /> {/* BTN borrar */}

        </>
    )
};