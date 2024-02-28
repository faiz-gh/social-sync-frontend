import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import EventCalendarView from '@/app/shared/event-calendar';
import DashboardStats from '@/app/shared/dashboard-stats';

export const metadata = {
  ...metaObject('Dashboard'),
};

const pageHeader = {
  title: 'Dashboard',
  breadcrumb: [
    {
      href: routes.sidebar.dashboard,
      name: 'Home',
    },
    {
      name: 'Dashboard',
    },
  ],
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="grid grid-cols-6 gap-6 @container">
        <DashboardStats className="col-span-full" />
        <div className="col-span-full">
          <EventCalendarView />
        </div>
      </div>
    </>
  );
}
