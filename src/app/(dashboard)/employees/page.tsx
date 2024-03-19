"use client"
import PageHeader from '@/app/shared/page-header';
import {routes} from '@/config/routes';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import ExportButton from '@/app/shared/export-button';
import {getColumns} from './columns';
import ModalButton from '@/app/shared/modal-button';
import AddEmployeeForm from './add-employee-form';
import useEmployee from "@/hooks/use-employee";
import {useEffect, useState} from "react";
import {UserType} from "@/types";

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

export default function EmployeePage() {
  const { employees } = useEmployee();

  if (employees.length > 0) {
    return (
      <>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
            <ExportButton data={employees} fileName='fileName' header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At" />
            <ModalButton
              label="Create Employee"
              view={<AddEmployeeForm />}
              customSize="900px"
              className="mt-0 w-full @lg:w-auto"
            />
          </div>
        </PageHeader>
        <div className="grid grid-cols-1 gap-6 3xl:gap-8" id="hello">
          <BasicTableWidget
            variant="minimal"
            data={employees}
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
            <ExportButton data={employees} fileName='fileName' header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At" />
            <ModalButton
              label="Create Employee"
              view={<AddEmployeeForm />}
              customSize="900px"
              className="mt-0 w-full @lg:w-auto"
            />
          </div>
        </PageHeader>
        <div className="grid grid-cols-1 gap-6 3xl:gap-8">
          <div className="flex items-center justify-center w-full h-[calc(100vh-200px)]">
            <p className="text-lg text-gray-500">No employees found</p>
          </div>
        </div>
      </>
    );
  }
}
