'use client'
import EventCalendarView from '@/app/shared/event-calendar';
import EventForm from '@/app/shared/event-calendar/event-form';
import ExportButton from '@/app/shared/export-button';
import ModalButton from '@/app/shared/modal-button';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import useEventCalendar from "@/hooks/use-event-calendar";

const pageHeader = {
  title: 'Events',
  breadcrumb: [
    {
      href: routes.sidebar.dashboard,
      name: 'Home',
    },
    {
      href: routes.sidebar.events,
      name: 'Events',
    },
  ],
};

export default function EventsPage() {
  const { events } = useEventCalendar();
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={events}
            fileName="event_data"
            header="ID,Title,Description,Location,Start,End"
          />
          <ModalButton
            label="Create Event"
            view={<EventForm />}
            customSize="900px"
            className="mt-0 w-full @lg:w-auto"
          />
        </div>
      </PageHeader>

      <EventCalendarView />
    </>
  );
}
