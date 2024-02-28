'use client';

import { PiXBold } from 'react-icons/pi';
import { SubmitHandler } from 'react-hook-form';
import { ActionIcon, Button, Input, Text, Textarea, Title } from 'rizzui';
import cn from '@/utils/class-names';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/components/ui/form';
import toast from 'react-hot-toast';
import useClient from '@/hooks/use-client';
import { Client } from './[clientId]/page';

interface ClientFormInput {
    id?: string;
    name?: string;
    email?: string;
    employeeId?: number;
}

export default function Account(client: Client) {
    const { closeModal } = useModal();
    const { createClient, updateClient } = useClient();

    const isUpdateClient = client !== undefined;

    const onSubmit: SubmitHandler<ClientFormInput> = (data) => {
        const isNewClient = data.id === '' || data.id === undefined;

        client.name = data.name;
        client.email = data.email;
        client.employeeId = data.employeeId;

        console.log('event_data', data);

        toast.success(
            <Text as="b">
                Event {isNewClient ? 'Created' : 'Updated'} Successfully
            </Text>
        );

        if (isNewClient) {
            createClient(client);
        } else {
            updateClient(client);
        }
        closeModal();
    };

    return (
        <div className="m-auto p-4 md:px-7 md:py-10">
            <div className="mb-6 flex items-center justify-between">
                <Title as="h3" className="text-lg">
                    {isUpdateClient ? 'Update Event' : 'Create a new event'}
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
                    const name = watch('name');
                    const email = watch('email');
                    const employeeId = watch('employeeId')
                    return (
                        <>
                            <input type="hidden" {...register('id')} value={client.id} />
                            <Input
                                label="Client Name"
                                placeholder="Enter the name of client"
                                {...register('name')}
                                className="col-span-full"
                            />
                            <Input
                                label="Client Email"
                                placeholder="Enter the email of client"
                                {...register('email')}
                                className="col-span-full"
                            />
                            <Input
                                label="Employee Id"
                                placeholder="Enter the id of employee"
                                {...register('employeeId')}
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
