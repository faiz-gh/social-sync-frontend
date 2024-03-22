'use client';

import { PiXBold } from 'react-icons/pi';
import { SubmitHandler, Controller } from 'react-hook-form';
import {ActionIcon, Button, Input, Select, SelectOption, Title} from 'rizzui';
import cn from '@/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/components/ui/form';
import {useEffect, useState} from "react";
import useEmployee from "@/hooks/use-employee";
import useClient from "@/hooks/use-client";

interface ClientFormInput {
    name?: string;
    email?: string;
    companyId?: string;
    employeeId?: string;
}

export default function AddPostForm() {
    const { closeModal } = useModal();
    const { employees } = useEmployee();
    const { createClient, fetchClientsByEmployee } = useClient();

    const [employeeList, setEmployeeList] = useState<SelectOption[]>([]);

    useEffect(() => {
        employees.map((employee) => {
            setEmployeeList((prev) => [
                ...prev,
                {
                    label: `${employee.first_name} ${employee.last_name}`,
                    value: employee?.id || ''
                }
            ]);
        })
    }, [employees]);

    const onSubmit: SubmitHandler<ClientFormInput> = async (data) => {
        createClient({
            name: data?.name || '',
            email: data?.email || '',
            employeeId: data?.employeeId || ''
        });
        await fetchClientsByEmployee(data?.employeeId || '');

        closeModal();
    };

    return (
      <div className="m-auto p-4 md:px-7 md:py-10">
          <div className="mb-6 flex items-center justify-between">
              <Title as="h3" className="text-lg">
                  Create a new Client
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
                          label="Client Name"
                          placeholder="Enter the name of client"
                          {...register('name')}
                          className="col-span-full"
                        />
                        <Input
                          label="Client Email"
                          placeholder="Enter the email of employee"
                          {...register('email')}
                          className="col-span-full"
                        />
                            <Controller
                              name="employeeId"
                              control={control}
                              render={({field: {name, onChange, value}}) => (
                                <Select
                                  options={employeeList}
                                  value={value}
                                  onChange={onChange}
                                  name={name}
                                  label="Employee"
                                  className="col-span-full"
                                  getOptionValue={(option) => option.value}
                                  displayValue={(selected: string) =>
                                    employeeList.find((option) => option.value === selected)?.label ??
                                    selected
                                  }
                                  dropdownClassName="!z-[1]"
                                  inPortal={false}
                                />
                              )}
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
