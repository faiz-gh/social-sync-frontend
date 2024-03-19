'use client';

import { PinCode, Button } from 'rizzui';
import { Form } from '@/components/ui/form';
import { SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import {IVerifyOtpRequest, IVerifyOtpResponse} from "@/types";
import {verifyOtp} from "@/lib/apiRequests/auth";
import {useRouter} from "next/navigation";
import {routes} from "@/config/routes";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

type FormValues = {
  otp: string;
};

type OtpFormProps = {
  email: string;
  sessionToken: string;
};

export default function OtpForm({ email, sessionToken }: OtpFormProps) {
  const router = useRouter()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload: IVerifyOtpRequest = {
      email: email,
      code: data.otp,
      session: sessionToken,
    };
    const response: IVerifyOtpResponse = await verifyOtp(payload);

    if (response.statusText === 'OK' && response.data.data) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      Cookies.set('user_role', response.data.data.role_id as string);
      toast.success(response.data.message);
      router.push(routes.sidebar.dashboard);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <Form<FormValues> onSubmit={onSubmit}>
      {({ setValue }) => (
        <div className="space-y-5 lg:space-y-8">
          <PinCode
            variant="outline"
            length={6}
            setValue={(value) => setValue('otp', String(value))}
            className="pb-2"
            size="lg"
          />

          <Button
            className="w-full text-base font-medium"
            type="submit"
            size="xl"
            variant="outline"
            rounded="lg"
          >
            Resend OTP
          </Button>
          <Button
            className="w-full text-base font-medium"
            type="submit"
            size="xl"
            rounded="lg"
          >
            Verify OTP
          </Button>
        </div>
      )}
    </Form>
  );
}
