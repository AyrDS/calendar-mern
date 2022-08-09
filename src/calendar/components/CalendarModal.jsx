import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import Modal from 'react-modal';
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import { useCalendarStore, useUiStore } from '../../hooks';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es)

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
   const { activeEvent, startSavingEvent } = useCalendarStore();

   const [formSubmitted, setFormSubmitted] = useState(false);

   const [formValues, setFormValues] = useState({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2)
   });
   const { end, notes, start, title } = formValues;

   const titleClass = useMemo(() => {
      if (!formSubmitted) {
         return '';
      }

      return (title.length > 0)
         ? ''
         : 'is-invalid';

   }, [title, formSubmitted]);

   useEffect(() => {
      if (activeEvent !== null) {
         setFormValues({
            ...activeEvent
         });
      }
   }, [activeEvent]);

   const onInputChange = ({ target }) => {
      setFormValues({
         ...formValues,
         [target.name]: target.value
      })
   }

   const onDateChanged = (e, changing) => {
      setFormValues({
         ...formValues,
         [changing]: e
      })
   }

   const onSubmit = async (e) => {
      e.preventDefault();
      setFormSubmitted(true);

      const diff = differenceInSeconds(end, start);

      if (isNaN(diff) || diff <= 0) {
         Swal.fire('Fechas incorrectas', '', 'error');
         return;
      }

      if (title.length <= 0) {
         return;
      }

      await startSavingEvent(formValues);
      closeDateModal();
      setFormSubmitted(false);
   }

   return (
      <Modal
         isOpen={isDateModalOpen}
         onRequestClose={closeDateModal}
         style={customStyles}
         className='modal'
         overlayClassName='modal-fondo'
         closeTimeoutMS={200}
      >
         <h1> Nuevo evento </h1>
         <hr />
         <form className="container" onSubmit={onSubmit}>

            <div className="form-group mb-2">
               <label>Fecha y hora inicio</label>
               <DatePicker
                  selected={start}
                  className='form-control'
                  onChange={(e) => onDateChanged(e, 'start')}
                  dateFormat='Pp'
                  showTimeSelect
                  locale='es'
                  timeCaption='Hora'
               />
            </div>

            <div className="form-group mb-2">
               <label>Fecha y hora fin</label>
               <DatePicker
                  minDate={start}
                  selected={end}
                  className='form-control'
                  onChange={(e) => onDateChanged(e, 'end')}
                  dateFormat='Pp'
                  showTimeSelect
                  locale='es'
                  timeCaption='Hora'
               />
            </div>

            <hr />
            <div className="form-group mb-2">
               <label>Titulo y notas</label>
               <input
                  type="text"
                  className={`form-control ${titleClass}`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={title}
                  onChange={onInputChange}
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
                  value={notes}
                  onChange={onInputChange}
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
