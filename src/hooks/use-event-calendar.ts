import { atom, useAtom } from 'jotai';
import uniqueId from 'lodash/uniqueId';
import { EventType } from '@/types';

const eventList: EventType[] = [
  {
    id: uniqueId(),
    company_id: "1",
    title: "Meeting with HR",
    start_date: new Date("2024-03-02T10:00:00"),
    end_date: new Date("2024-03-02T11:00:00"),
    description: "Meeting with HR to discuss the new project",
    location: "Office",

  },
];

export const eventAtom = atom<EventType[]>(eventList);

export default function useEventCalendar() {
  const [events, setEvents] = useAtom(eventAtom);


  function createEvent(event: EventType) {
    // Add a unique id to the event
    const newEvent = { ...event, id: uniqueId() };
    setEvents([...events, newEvent]);
  }

  function updateEvent(updatedEvent: EventType) {
    // Use map to replace the object with the same id
    const updatedEvents = events.map((event) => {
      if (event.id === updatedEvent.id) {
        return updatedEvent; // replace with the updated object
      }
      return event; // keep the original object
    });
    setEvents(updatedEvents);
  }

  function deleteEvent(eventID: string) {
    // Use filter to create a new array without the event to be deleted
    const updatedEvents = events.filter((event) => event.id !== eventID);

    // Update the state with the new array of events
    setEvents(updatedEvents);
  }

  return { events, setEvents, createEvent, updateEvent, deleteEvent };
}
