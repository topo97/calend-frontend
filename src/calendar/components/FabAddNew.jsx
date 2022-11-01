import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';


//! Btn nueva accion:
export const FabAddNew = () => {
    
    // uso los hooks. abrir modal y activar notas.
    const { openDateModal } = useUiStore();  //abrir modal.
    const { setActiveEvent } = useCalendarStore();  // limpiar notras anterires.

    //! BTN abre el modal para crear nuevas Notas:
    const handleClickNew = () => {

        // elimino notas anterior, uso el useCalendarStore.
        // este es mi nuevo elemnto activo y lo abro antes dellamar al modal.
        setActiveEvent({  //sin id en nota activa = esta actualizando.
                          //si  tendo id  = estoy creando una nota nueva.
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#fafafa',
            user: {
                _id:123,
                name: 'Juanma'
            }
        });        
        openDateModal(); 
    }

    
    return (
        <button 
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>

        </button>

    )
}
