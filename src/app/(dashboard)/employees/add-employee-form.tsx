'use client';

import { PiXBold } from 'react-icons/pi';
import { SubmitHandler } from 'react-hook-form';
import { ActionIcon, Button, Input, Title } from 'rizzui';
import cn from '@/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/components/ui/form';
import useEmployee from "@/hooks/use-employee";

interface EmployeeFormInput {
    firstName?: string;
    lastName?: string;
    email?: string;
}

export default function AddEmployeeForm() {
    const { closeModal } = useModal();
    const { createEmployee } = useEmployee();

    const onSubmit: SubmitHandler<EmployeeFormInput> = (data) => {
        createEmployee({
            first_name: data?.firstName || '',
            last_name: data?.lastName || '',
            email: data?.email || '',
        })
        closeModal();
    };

    return (
      <div className="m-auto p-4 md:px-7 md:py-10">
          <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-lg">
                  Create a new Employee
              </Title>
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => closeModal()}
                className="p-0 text-gray-500 hover:!text-gray-900"
              >
                  <PiXBold className="h-[18px] w-[18px]" />
              </ActionIcon>
          </div>

          <Form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 @container md:grid-cols-2 [&_label]:font-medium">
              {({ register, control, watch, formState: { errors } }) => {
                  return (
                    <>
                        <Input
                          label="First Name"
                          placeholder="Enter the first name of employee"
                          {...register('firstName')}
                          className="col-span-full"
                        />
                        <Input
                          label="Last Name"
                          placeholder="Enter the last name of employee"
                          {...register('lastName')}
                          className="col-span-full"
                        />
                        <Input
                          label="Employee Email"
                          placeholder="Enter the email of employee"
                          {...register('email')}
                          className="col-span-full"
                        />
                        <div className={cn('col-span-full grid grid-cols-2 gap-4 pt-5')}>
                            <Button
                              variant="outline"
                              className="w-full @xl:w-auto dark:hover:border-gray-400"
                              onClick={() => closeModal()}
                            >
                                Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="hover:gray-700 w-full @xl:w-auto"
                            >
                                Save
                            </Button>
                        </div>
                    </>
                  );
              }}
          </Form>
      </div>
    );
}
