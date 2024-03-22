import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  categoryOption,
  typeOption,
} from './form-utils';
import dynamic from 'next/dynamic';
import { DatePicker } from '@/components/ui/datepicker';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Post Content"
      description="Edit your post options and description here"
      className={cn(className)}
    >
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Description"
            className="col-span-full [&_.ql-editor]:min-h-[200px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />
      <Controller
        name="postSchedule"
        control={control}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            inputProps={{ label: 'Schedule Date' }}
            popperPlacement="top-start"
            selected={value}
            onChange={onChange}
            selectsStart
            startDate={value}
            minDate={new Date()}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className="date-picker-event-calendar"
            placeholderText="Post Schedule Date"
          />
        )}
      />
      <Input
        label="Location"
        placeholder="Post Location"
        {...register('location')}
        error={errors.sku?.message as string}
      />
    </FormGroup>
  );
}
