import { atom, useAtom } from 'jotai';
import {
  EventType,
  ICreateEventRequest,
  ICreateEventResponse, IDeleteEventRequest, IDeleteEventResponse,
  IGetEventsByCompanyRequest, IGetEventsByCompanyResponse,
  IUpdateEventRequest, IUpdateEventResponse,
  UserType
} from '@/types';
import toast from "react-hot-toast";
import {routes} from "@/config/routes";
import {useRouter} from "next/navigation";
import {getEventsByCompany} from "@/lib/apiRequests/event";
import {createEvent as addEvent, updateEvent as changeEvent, removeEvent} from "@/lib/apiRequests/event";

export const eventAtom = atom<EventType[]>([]);
export const fetchEventAtom = atom<boolean>(true);

export default function useEventCalendar() {
  const [events, setEvents] = useAtom(eventAtom);
  const [fetchEvent, setFetchEvent] = useAtom(fetchEventAtom);
  const router = useRouter();

  if (fetchEvent){
    fetchEvents().then(
      () => setFetchEvent(false)
    );
  }

  async function fetchEvents() {
    const userStr = localStorage.getItem('user');
    const user: UserType = userStr ? JSON.parse(userStr) : null;

    if (!user){
      toast.error('User not logged in');
      router.push(routes.auth.signIn);
    }

    // Fetch events from the server
    const payload: IGetEventsByCompanyRequest = {
      companyId: user?.id || ''
    }

    const response: IGetEventsByCompanyResponse = await getEventsByCompany(payload)

    if (response.statusText === 'OK' && response.data.data){
      response.data.data.forEach((event: EventType) => {
        event.start_date = new Date(event?.start_date || '');
        event.end_date = new Date(event?.end_date || '');
      });
      setEvents(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  }

  function createEvent(event: EventType) {
    const userStr = localStorage.getItem('user');
    const user: UserType = userStr ? JSON.parse(userStr) : null;

    if (!user){
      toast.error('User not logged in');
      router.push(routes.auth.signIn);
    }

    const payload: ICreateEventRequest = {
      companyId: user?.id || '',
      description: event?.description || '',
      title: event?.title || '',
      startDate: event?.start_date || new Date(),
      endDate: event?.end_date ||  new Date()
    }

    addEvent(payload).then((response: ICreateEventResponse) => {
      if (response.statusText === 'OK' && response.data.data){
        toast.success(response.data.message);
        setFetchEvent(true);
      } else {
        toast.error(response.data.message);
      }
    });
  }

  function updateEvent(updatedEvent: EventType) {
    const userStr = localStorage.getItem('user');
    const user: UserType = userStr ? JSON.parse(userStr) : null;

    if (!user){
      toast.error('User not logged in');
      router.push(routes.auth.signIn);
    }

    const payload: IUpdateEventRequest = {
      id: updatedEvent?.id || '',
      description: updatedEvent?.description || '',
      title: updatedEvent?.title || '',
      startDate: updatedEvent?.start_date || new Date(),
      endDate: updatedEvent?.end_date ||  new Date()
    }

    changeEvent(payload).then((response: IUpdateEventResponse) => {
      if (response.statusText === 'OK' && response.data.data){
        toast.success(response.data.message);
        setFetchEvent(true);
      } else {
        toast.error(response.data.message);
      }
    });
  }

  function deleteEvent(eventID: string) {
    const payload: IDeleteEventRequest = {
      id: eventID
    }
    removeEvent(payload).then((response: IDeleteEventResponse) => {
      if (response.statusText === 'OK' && response.data.data){
        toast.success(response.data.message);
        setFetchEvent(true);
      } else {
        toast.error(response.data.message);
      }
    });
  }

  return { events, fetchEvents, setEvents, createEvent, updateEvent, deleteEvent };
}
