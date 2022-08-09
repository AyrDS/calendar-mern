import { useSelector, useDispatch } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {

   const { events, activeEvent } = useSelector(state => state.calendar);

   const dispatch = useDispatch();

   const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent));
   }

   const startSavingEvent = async (calendarEvent) => {
      if (calendarEvent._id) {
         //actualizando...
         dispatch(onUpdateEvent({ ...calendarEvent }))
      } else {
         //creando...
         dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
      }
   }

   const startDeletingEvent = () => {
      dispatch(onDeleteEvent());
   }

   return {
      activeEvent,
      events,
      hasEventSelected: !!activeEvent,
      setActiveEvent,
      startDeletingEvent,
      startSavingEvent,
   }
}