"use client"
import PageHeader from '@/app/shared/page-header';
import {routes} from '@/config/routes';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import ExportButton from '@/app/shared/export-button';
import {getColumns} from './columns';
import ModalButton from '@/app/shared/modal-button';
import AddClientForm from './add-client-form';
import useClient from "@/hooks/use-client";
import useUserRole from "@/hooks/use-user-role";
import {USER_ROLE} from "@/config/enums";
import {useEffect} from "react";
import {UserType} from "@/types";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

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

export default function ClientPage() {
  const { clientsByCompany, clientsByEmployee, fetchClientsByEmployee } = useClient();
  const { userRole } = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (userRole == USER_ROLE.COMPANY) {
      const userStr = localStorage.getItem('user');
      const user: UserType = userStr ? JSON.parse(userStr) : null;

      if (!user){
        toast.error('User not logged in');
        router.push(routes.auth.signIn);
      }
      fetchClientsByEmployee(user?.id || '');
    }
  }, []);

  if (clientsByCompany.length > 0 || clientsByEmployee.length > 0) {
    return (
      <>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
            <ExportButton data={(userRole == USER_ROLE.COMPANY) ? clientsByCompany : clientsByEmployee} fileName='fileName' header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At" />
            <ModalButton
              label="Create Client"
              view={<AddClientForm />}
              customSize="900px"
              className="mt-0 w-full @lg:w-auto"
            />
          </div>
        </PageHeader>
        <div className="grid grid-cols-1 gap-6 3xl:gap-8">
          <BasicTableWidget
            variant="minimal"
            data={(userRole == USER_ROLE.COMPANY) ? clientsByCompany : clientsByEmployee}
            // @ts-ignore
            getColumns={getColumns}
            enableSearch={false}
            enablePagination={true}
            pageSize={7}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
            <ExportButton data={(userRole == USER_ROLE.COMPANY) ? clientsByCompany : clientsByEmployee} fileName='fileName' header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At" />
            <ModalButton
              label="Create Client"
              view={<AddClientForm />}
              customSize="900px"
              className="mt-0 w-full @lg:w-auto"
            />
          </div>
        </PageHeader>
        <div className="grid grid-cols-1 gap-6 3xl:gap-8">
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500 text-lg">No clients found</p>
          </div>
        </div>
      </>
    );
  }

}
