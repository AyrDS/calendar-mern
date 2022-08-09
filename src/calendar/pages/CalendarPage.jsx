import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../';
import { localizer, getMsgEs } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';

import 'react-big-calendar/lib/css/react-big-calendar.css';

export const CalendarPage = () => {

   const { openDateModal } = useUiStore();
   const { events, setActiveEvent } = useCalendarStore();

   const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

   const eventStyleGetter = (event, start, end, isSelected) => {

      const style = {
         backgroundColor: 'red',
         borderRadius: '0px',
         opacity: 0.8,
         color: 'white'
      }

      return {
         style
      }

   }

   const onDoubleClick = () => {
      openDateModal();
   }

   const onSelect = (event) => {
      setActiveEvent(event);
   }

   const onViewChanged = (event) => {
      localStorage.setItem('lastView', event);
      setLastView(event);
   }

   return (
      <>
         <Navbar />
         <Calendar
            localizer={localizer}
            events={events}
            defaultView={lastView}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc(100vh - 80px)' }}
            culture='es'
            messages={getMsgEs()}
            eventPropGetter={eventStyleGetter}
            components={{
               event: CalendarEvent
            }}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelect}
            onView={onViewChanged}
         />
         <CalendarModal />
         <FabAddNew />
         <FabDelete />
      </>
   )
}
