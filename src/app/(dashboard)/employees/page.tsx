import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import ExportButton from '@/app/shared/export-button';
import { getColumns } from './columns';
import ModalButton from '@/app/shared/modal-button';
import EmployeeForm from './add-employee-form';

export const metadata = {
  ...metaObject('Employees'),
};

const pageHeader = {
  title: 'Employees',
  breadcrumb: [
    {
      href: routes.sidebar.dashboard,
      name: 'Home',
    },
    {
      href: routes.sidebar.employees,
      name: 'Employees',
    },
  ],
};

export type Employee = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  totalClients?: number;
  createdDate?: string;
}

const employeeData: Employee[] = [
  {
    id: 1,
    firstName: "Faiz",
    lastName: "Ghanchi",
    email: "hr@nebe.one",
    totalClients: 10,
    createdDate: "12-02-2024",
  },
  {
    id: 1,
    firstName: "Faiz",
    lastName: "Ghanchi",
    email: "hr@nebe.one",
    totalClients: 10,
    createdDate: "12-02-2024",
  },
  {
    id: 1,
    firstName: "Faiz",
    lastName: "Ghanchi",
    email: "hr@nebe.one",
    totalClients: 10,
    createdDate: "12-02-2024",
  },
  {
    id: 1,
    firstName: "Faiz",
    lastName: "Ghanchi",
    email: "hr@nebe.one",
    totalClients: 10,
    createdDate: "12-02-2024",
  },
  {
    id: 1,
    firstName: "Faiz",
    lastName: "Ghanchi",
    email: "hr@nebe.one",
    totalClients: 10,
    createdDate: "12-02-2024",
  }
]

export default function EmployeePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton data={employeeData} fileName='fileName' header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At" />
          <ModalButton
            label="Create Employee"
            view={<EmployeeForm />}
            customSize="900px"
            className="mt-0 w-full @lg:w-auto"
          />
        </div>
      </PageHeader>
      <div className="grid grid-cols-1 gap-6 3xl:gap-8">
        <BasicTableWidget
          variant="minimal"
          data={employeeData}
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
