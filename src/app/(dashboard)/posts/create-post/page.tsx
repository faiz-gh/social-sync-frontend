import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import CreateEditPost from './create-edit-post';

export const metadata = {
  ...metaObject('Posts'),
};

const pageHeader = {
  title: 'Create Post',
  breadcrumb: [
    {
      href: routes.sidebar.dashboard,
      name: 'Home',
    },
    {
      href: routes.sidebar.clients,
      name: 'Clients',
    },
    {
      name: 'Create Post',
    },
  ],
};

export default function ClientsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <CreateEditPost />
    </>
  );
}
