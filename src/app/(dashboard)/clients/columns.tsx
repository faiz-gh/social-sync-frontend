'use client';

import Link from 'next/link';
import { Text, Tooltip, Checkbox, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import PencilIcon from '@/components/icons/pencil';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import ClientForm from './add-client-form';
import ModalLink from '@/app/shared/modal-link';
import { PiUserCircleGear, PiUserList } from 'react-icons/pi';

type Columns = {
  data: any[];
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
      title: <HeaderCell title="Name" />,
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (name: string) => name.toString(),
    },
    {
      title: <HeaderCell title="Email" />,
      dataIndex: 'email',
      key: 'email',
      width: 250,
      render: (email: string) => email.toLowerCase(),
    },
    {
      title: <HeaderCell title="Employee Id" />,
      dataIndex: 'employeeId',
      key: 'employeeId',
      width: 250,
      render: (employeeId: string) => employeeId.toString(),
    },
    {
      title: (
        <HeaderCell
          title="Total Accounts"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'totalAccounts'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('totalAccounts'),
      dataIndex: 'totalAccounts',
      key: 'totalAccounts',
      width: 200,
      render: (totalAccounts: string) => (
        <Text className="font-medium text-gray-700 dark:text-gray-600">
          {totalAccounts}
        </Text>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Created At"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'createdDate'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('createdDate'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      width: 200,
      render: (createdDate: Date) => <DateCell date={createdDate} />,
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
            content={'Edit Client'}
            placement="top"
            color="invert"
          >
            <ModalLink
              view={<ClientForm />}
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
            content={'Create Post'}
            placement="top"
            color="invert"
          >
            <Link href={`/posts`}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:!border-gray-900 hover:text-gray-700"
              >
                <PiUserCircleGear className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <DeletePopover
            title={`Delete the client`}
            description={`Are you sure you want to delete this client with id #${row.id}?`}
            onDelete={() => onDeleteItem(row.id)}
          />
        </div>
      ),
    },
  ];
