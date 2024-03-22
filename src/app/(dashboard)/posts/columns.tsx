'use client';

import { Checkbox } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import DateCell from '@/components/ui/date-cell';
import {PostType} from '@/types';

type Columns = {
  data: PostType[];
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
      title: <HeaderCell title="Account Name" />,
      dataIndex: 'account_name',
      key: 'account_name',
      width: 250,
      render: (account_name: string) => account_name.toString(),
    },
    {
        title: <HeaderCell title="Facebook Post Id" />,
      dataIndex: 'page_post_id',
      key: 'page_post_id',
      width: 250,
      render: (page_post_id: string) => page_post_id.toLowerCase(),
    },
    {
      title: <HeaderCell title="Location" />,
      dataIndex: 'location',
      key: 'location',
      width: 250,
      render: (location: string) => location.toString(),
    },
    {
      title: (
        <HeaderCell
          title="Post Schedule"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'post_schedule'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('post_schedule'),
      dataIndex: 'post_schedule',
      key: 'post_schedule',
      width: 200,
      render: (post_schedule: Date) => <DateCell date={new Date(post_schedule)} />,
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
    }
  ];
