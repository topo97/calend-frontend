import {  useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal  from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import  'react-datepicker/dist/react-datepicker.css' ;

import es from 'date-fns/locale/es';
import {  useUiStore, useCalendarStore } from '../../hooks';

registerLocale( 'es', es ) // horario al español.

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();    
    
    const { activeEvent,startSavingEvent } = useCalendarStore(); //llega mi event del stor

    const [ formSuBmitted, setFormSubmitted ] = useState(false);

    // manejo estado de mi formulario
    const [formValues, setformValues] = useState({
        title: 'Pepe',
        notes: 'Conbas',
        start: new Date(),
        end: addHours(new Date(), 2),

    });

    // necesito memoriazr el titulo.
    const titleClass = useMemo(() => {
        if( !formSuBmitted ) return '';         // Si no disparo el fomulario, retorna un strin vacioen mi class.
        
        return (formValues.title.length > 0 )   // Si el titulo esta vacio, activo el error.
            ? ''
            : 'is-invalid';
            
    },[ formValues.title, formSuBmitted ]);     // el titlulo es una dependencia.


    useEffect(() => {

        if( activeEvent !== null ) {
            setformValues( {...activeEvent } ) //uso op exprett para q rompa la instancia y genere un nuevo estado al ob 
        }

    }, [activeEvent]);
    

    const onInputChange = ({ target }) => {     //actualiza el valor q llega a setForm
        setformValues({
            ...formValues,
            [target.name]: target.value
        })

    };

    //puedo cambiar mi fecha al seleccionar un numero d calend.
    // el changin trae start || end.
    const onDateChanged = ( event, changing) => {
        setformValues({
            ...formValues,
            [changing]: event
        })
    }
    
    const onCloseModal = () => {
        console.log('cerrando modal')
        closeDateModal();
        
    }

    // posteo del formulario:
    const onSubmit = async(event) => {
        event.preventDefault();
        // si lleno el formulario, mi accion es verdadera
        setFormSubmitted(true);

        //mi fecha inicial no puede ser mayor a la final.
        const diferencia = differenceInSeconds( formValues.end, formValues.start );
        
        // Mi condicion:
        if( isNaN( diferencia ) || diferencia <= 0 ) {
            Swal.fire('Fecha incorrecta', 'Porfavor, revisa tus fechas!', 'error')
            return;
        }

        if( formValues.title.length <= 0 ) return;

        console.log(formValues);

        // TODO:
        await startSavingEvent( formValues );  //evento d calendario       // restablecer pantallas o errores.
        closeDateModal();                    // cerrar el modal
        setFormSubmitted(false);


    }



    return (
        <Modal
            isOpen={ isDateModalOpen}
            onRequestClose={ onCloseModal }
            style={customStyles}
            className="modal"              // LLAMADO DE STYLES
            overlayClassName="modal-fondo" //CLASS DEL FONDO
            closeTimeoutMS={ 200 }
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>

                    {/* // le tengo mq pasar fecha seleccionada para estar actualizado. */}
                    <DatePicker 
                        selected={ formValues.start }
                        onChange={ (event) => onDateChanged(event, 'start')}
                        className="form-control"
                        dateFormat={"Pp"}    //segundos
                        showTimeSelect
                        locale="es"         // hora al español
                        timeCaption="Hora"

                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>

                    <DatePicker 
                        minDate={ formValues.start} // fecha minima d nicio.
                        selected={ formValues.end }
                        onChange={ (event) => onDateChanged(event, 'end')}
                        className="form-control"
                        dateFormat={"Pp"} 
                        showTimeSelect
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ titleClass }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title}
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>        
    )
}
