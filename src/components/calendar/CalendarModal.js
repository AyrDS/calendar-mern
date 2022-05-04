import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { uiCloseModal } from '../../actions/uiActions';
import { eventAddNew, eventClearActiveEvent, eventUpdate } from '../../actions/eventsActions';

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

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
}

const CalendarModal = () => {

    const dispatch = useDispatch();
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [tittleValid, setTittleValid] = useState(true);
    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);

    const [formValues, setformValues] = useState(initEvent);

    const { notes, title, start, end } = formValues;


    useEffect(() => {
        if (activeEvent) {
            setformValues(activeEvent);
        } else {
            setformValues(initEvent);
        }

    }, [activeEvent, setformValues]);


    const handleInputChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value,
        })
    }

    const onChangeStartDate = (e) => {
        setDateStart(e);
        setformValues({
            ...formValues,
            start: e
        });
    }

    const onChangeEndDate = (e) => {
        setDateEnd(e);
        setformValues({
            ...formValues,
            end: e
        });
    }

    const closeModal = () => {
        setformValues(initEvent);
        dispatch(eventClearActiveEvent());
        dispatch(uiCloseModal());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
            return;
        }

        if (title.trim() < 2) {
            return setTittleValid(false);
        }

        if (activeEvent) {
            dispatch(eventUpdate(formValues));
        } else {
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123123',
                    name: 'Battagol',
                }
            }));
        }

        setTittleValid(true);
        closeModal();
    }


    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'
        >
            <h1> {activeEvent ? 'Editar evento' : 'Nuevo evento'} </h1>
            <hr />
            <form
                className='container'
                onSubmit={handleSubmit}
            >

                <div className='form-group mb-3'>
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={onChangeStartDate}
                        value={dateStart}
                        className='form-control'
                        format='dd-MM-y h:mm a'
                        amPmAriaLabel='Select AM/PM'
                    />
                </div>

                <div className='form-group mb-3'>
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={onChangeEndDate}
                        value={dateEnd}
                        className='form-control'
                        format='dd-MM-y h:mm a'
                        amPmAriaLabel='Select AM/PM'
                        minDate={dateStart}
                    />
                </div>

                <hr />
                <div className='form-group mb-3'>
                    <label>Titulo y notas</label>
                    <input
                        type='text'
                        className={`form-control ${!tittleValid && 'is-invalid'}`}
                        placeholder='Título del evento'
                        name='title'
                        autoComplete='off'
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id='emailHelp' className='form-text text-muted'>Una descripción corta</small>
                </div>

                <div className='form-group mb-3'>
                    <textarea
                        type='text'
                        className='form-control'
                        placeholder='Notas'
                        rows='5'
                        name='notes'
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id='emailHelp' className='form-text text-muted'>Información adicional</small>
                </div>

                <button
                    type='submit'
                    className='btn btn-outline-primary btn-block'
                >
                    <i className='far fa-save'></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

export default CalendarModal;