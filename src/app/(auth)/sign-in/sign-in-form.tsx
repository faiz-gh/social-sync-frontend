'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Button, Input, Text } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { useRouter } from 'next/navigation';
import { ILoginRequest, ILoginResponse } from '@/types';
import Cookies from 'js-cookie';
import { login } from '@/lib/apiRequests/auth';
import {useState} from "react";
import toast from "react-hot-toast";

const initialValues: LoginSchema = {
  email: '',
};

export default function SignInForm() {
  const router = useRouter();
  const isMedium = useMedia('(max-width: 1200px)', false);
  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    let payload: ILoginRequest = {
      email: data.email,
    };

    const response: ILoginResponse = await login(payload);

    if (response.statusText === 'OK' && response.data.data) {
      // localStorage.setItem('email', data.email);
      // localStorage.setItem('token', response.data.data.Session);

      Cookies.set('email', data.email)
      Cookies.set('token', response.data.data.Session)

      toast.success('Login otp sent to your email');
      router.push(routes.auth.verifyOtp);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Sign In
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
