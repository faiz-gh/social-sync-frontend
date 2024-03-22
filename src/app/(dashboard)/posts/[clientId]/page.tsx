"use client"
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import ExportButton from '@/app/shared/export-button';
import { getColumns } from '../columns';
import ModalButton from '@/app/shared/modal-button';
import AddClientForm from '../add-post-form';
import useClient from "@/hooks/use-client";
import {useEffect} from "react";
import usePost from "@/hooks/use-post";

const pageHeader = {
  title: 'Posts',
  breadcrumb: [
    {
      href: routes.sidebar.dashboard,
      name: 'Home',
    },
    {
      href: routes.sidebar.posts,
      name: 'Posts',
    },
  ],
};

export default function PostPage({ params }: { params: { clientId: string } }) {
  const { postsByEmployee, fetchPostsByEmployee } = usePost();

  useEffect(() => {
    fetchPostsByEmployee(params.clientId);
  }, []);

  if (postsByEmployee.length > 0) {
    return (
      <>
        <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
          <div className="mt-4 flex items-center gap-3 @lg:mt-0">
            <ExportButton data={postsByEmployee} fileName='fileName' header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At" />
          </div>
        </PageHeader>
        <div className="grid grid-cols-1 gap-6 3xl:gap-8">
          <BasicTableWidget
            variant="minimal"
            data={postsByEmployee}
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
            <ExportButton data={postsByEmployee} fileName='fileName' header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At" />
          </div>
        </PageHeader>
        <div className="grid grid-cols-1 gap-6 3xl:gap-8">
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500 text-lg">No posts found</p>
          </div>
        </div>
      </>
    );
  }

}
