import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { messages } from '../../helpers/calendar-msg-es';
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';
import Navbar from '../ui/Navbar';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { uiOpenModal } from '../../actions/uiActions';
import { eventClearActiveEvent, eventSetActive } from '../../actions/eventsActions';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }

    const eventStyleGetter = (e, start, end, isSelected) => {
        const style = {
            backgroundColor: '#000000',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white',
        }

        return {
            style
        }
    }

    return (
        <div className='calendar-screen' >
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {activeEvent && <DeleteEventFab />}

            <CalendarModal />
        </div>
    )
}

export default CalendarScreen;