import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

// amanejar y hacer dispatch de acciones y controlar toto lo relacionado al ui d  el store
export const useUiStore = () => {

    const dispatch = useDispatch();

    // accedo al estado del ui/store.
    const {
        isDateModalOpen
    } = useSelector( state => state.ui );

    //* ABRO EL MODAL:
    const openDateModal = () => {
        // necesitro el dispach d mi accion.
        dispatch( onOpenDateModal() );
    }

    //*CIERRO EL MODAL 
    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    const toggleDateModal= () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal()
    };

    return {
        //* propiedades:
            isDateModalOpen,
            
        //*  Metodos:
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }

}