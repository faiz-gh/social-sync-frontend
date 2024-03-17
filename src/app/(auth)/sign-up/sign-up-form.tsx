'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Button, Input, Text } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/utils/validators/signup.schema';
import { IRegisterRequest, IRegisterResponse } from '@/types';
import { USER_ROLE } from '@/config/enums';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/apiRequests/auth';
import toast from 'react-hot-toast';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
};

export default function SignUpForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    const payload: IRegisterRequest = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      roleId: USER_ROLE.COMPANY,
    }

    const response: IRegisterResponse = await register(payload);

    if (response.statusText === 'OK' && response.data.data) {
      toast.success(response.data.message);
      setReset(initialValues);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="gap-x-4 gap-y-5 lg:grid lg:grid-cols-2">
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="First Name"
              placeholder="Enter your first name"
              className="[&>label>span]:font-medium"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="Last Name"
              placeholder="Enter your last name"
              className="[&>label>span]:font-medium"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="col-span-2 [&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              className="col-span-2 w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Create Account
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
