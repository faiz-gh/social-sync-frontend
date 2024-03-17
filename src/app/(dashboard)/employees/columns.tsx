'use client';

import Link from 'next/link';
import { Text, Tooltip, Checkbox, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import ModalLink from '@/app/shared/modal-link';
import { PiUserList } from 'react-icons/pi';
import { UserType } from '@/types';
import UpdateEmployeeForm from "@/app/(dashboard)/employees/update-employee-form";

type Columns = {
  data: UserType[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
    {
      title: (
        <div className="ps-2">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={checkedItems.length === data.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 30,
      render: (_: any, row: any) => (
        <div className="inline-flex ps-2">
          <Checkbox
            className="cursor-pointer"
            checked={checkedItems.includes(row.id)}
            {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="First Name" />,
      dataIndex: 'first_name',
      key: 'first_name',
      width: 250,
      render: (first_name: string) => first_name.toString(),
    },
    {
      title: <HeaderCell title="Last Name" />,
      dataIndex: 'last_name',
      key: 'last_name',
      width: 250,
      render: (last_name: string) => last_name.toString(),
    },
    {
      title: <HeaderCell title="Email" />,
      dataIndex: 'email',
      key: 'email',
      width: 250,
      render: (email: string) => email.toLowerCase(),
    },
    {
      title: (
        <HeaderCell
          title="Total Clients"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'total_clients'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('total_clients'),
      dataIndex: 'total_clients',
      key: 'total_clients',
      width: 200,
      render: (total_clients: string) => (
        <Text className="font-medium text-gray-700 dark:text-gray-600">
          {total_clients}
        </Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Created At"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'created_date'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('created_date'),
      dataIndex: 'created_date',
      key: 'created_date',
      width: 200,
      render: (created_date: Date) => <DateCell date={created_date} />,
    },
    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 140,
      render: (_: string, row: any) => (
        <div className="flex items-center justify-end gap-3 pe-3">
          <Tooltip
            size="sm"
            content={'Edit Employee'}
            placement="top"
            color="invert"
          >
            <ModalLink
              view={<UpdateEmployeeForm employee={row} />}
              customSize="900px"
            >
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </ModalLink>
          </Tooltip>
          <Tooltip
            size="sm"
            content={'View Clients'}
            placement="top"
            color="invert"
          >
            <Link href={`/clients/${row.id}`}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
              >
                <PiUserList className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <DeletePopover
            title={`Delete the Employee`}
            description={`Are you sure you want to delete this employee with id #${row.id}?`}
            onDelete={() => onDeleteItem(row.id)}
          />
        </div>
      ),
    },
  ];
