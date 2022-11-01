import { useCalendarStore } from '../../hooks';


//! Btn borrar notas:
export const FabDelete = () => {
    
    const { startDeleteEvent, hasEventSelected } = useCalendarStore();  // limpiar notras anterires.

    //! funcion q elimina notas:
    const handleDelete = () => {
        startDeleteEvent();
        
    }

    
    return (
        <button 
            className="btn btn-danger fab-danger"
            onClick={ handleDelete  }
            style={{    
                display: hasEventSelected ? '' : 'none' // condicion para ocultar mi btn
            }}
        >
            <i className="fas fa-trash-alt"></i>

        </button>

    )
}
