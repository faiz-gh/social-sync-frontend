import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import ExportButton from '@/app/shared/export-button';
import { getColumns } from './columns';
import ModalButton from '@/app/shared/modal-button';
import ClientForm from './add-client-form';

export const metadata = {
  ...metaObject('Clients'),
};

const pageHeader = {
  title: 'Clients',
  breadcrumb: [
    {
      href: routes.sidebar.dashboard,
      name: 'Home',
    },
    {
      href: routes.sidebar.clients,
      name: 'Clients',
    },
  ],
};

export type Client = {
  id?: number;
  name?: string;
  email?: string;
  totalAccounts?: number;
  createdDate?: string;
  modifiedDate?: string;
  employeeId?: number;
}

const clientData: Client[] = [
  {
    id: 1,
    name: "Nebe",
    email: "hr@nebe.one",
    totalAccounts: 10,
    createdDate: "12-02-2024",
    modifiedDate: "13-02-2024",
    employeeId: 1
  },
  {
    id: 2,
    name: "SocialSync",
    email: "faiz@socialsync.com",
    totalAccounts: 10,
    createdDate: "12-02-2024",
    modifiedDate: "13-02-2024",
    employeeId: 1
  },
  {
    id: 3,
    name: "Nebe",
    email: "avish@nebe.one",
    totalAccounts: 10,
    createdDate: "12-02-2024",
    modifiedDate: "13-02-2024",
    employeeId: 2
  },
  {
    id: 4,
    name: "Avish",
    email: "avish@nebe.one",
    totalAccounts: 10,
    createdDate: "12-02-2024",
    modifiedDate: "13-02-2024",
    employeeId: 2
  },
  {
    id: 5,
    name: "Avish",
    email: "avish@nebe.one",
    totalAccounts: 10,
    createdDate: "12-02-2024",
    modifiedDate: "13-02-2024",
    employeeId: 3
  },
  {
    id: 6,
    name: "Avish",
    email: "avish@nebe.one",
    totalAccounts: 10,
    createdDate: "12-02-2024",
    modifiedDate: "13-02-2024",
    employeeId: 3
  },
  {
    id: 7,
    name: "Avish",
    email: "avish@nebe.one",
    totalAccounts: 10,
    createdDate: "12-02-2024",
    modifiedDate: "13-02-2024",
    employeeId: 4
  },
  {
    id: 8,
    name: "Avish",
    email: "avish@nebe.one",
    totalAccounts: 10,
    createdDate: "12-02-2024",
    modifiedDate: "13-02-2024",
    employeeId: 4
  },
  {
    id: 9,
    name: "Avish",
    email: "avish@nebe.one",
    totalAccounts: 10,
    createdDate: "12-02-2024",
    modifiedDate: "13-02-2024",
    employeeId: 5
  },
  {
    id: 10,
    name: "Avish",
    email: "avish@nebe.one",
    totalAccounts: 10,
    createdDate: "12-02-2024",
    modifiedDate: "13-02-2024",
    employeeId: 5
  }
]

export default function ClientsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton data={clientData} fileName='fileName' header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At" />
          <ModalButton
            label="Create Client"
            view={<ClientForm />}
            customSize="900px"
            className="mt-0 w-full @lg:w-auto"
          />
        </div>
      </PageHeader>
      <div className="grid grid-cols-1 gap-6 3xl:gap-8">
        <BasicTableWidget
          variant="minimal"
          data={clientData}
          // @ts-ignore
          getColumns={getColumns}
          enableSearch={false}
          enablePagination={true}
          pageSize={7}
        />
      </div>
    </>
  );
}
