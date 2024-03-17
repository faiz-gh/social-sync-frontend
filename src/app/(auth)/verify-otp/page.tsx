import AuthWrapper from '../../shared/auth-layout/auth-wrapper';
import { Text } from 'rizzui';
import OtpForm from './otp-form';
import {cookies} from "next/headers";

export default function OtpPage() {
  const email = cookies().get('email')?.value || '';
  const token = cookies().get('token')?.value || '';
  return (
    <AuthWrapper title="OTP Verification" className="md:px-14 lg:px-20">
      <Text className="pb-7 text-center text-[15px] leading-[1.85] text-gray-700 md:text-base md:!leading-loose lg:-mt-5">
        OTP has been sent to {email}
      </Text>
      <OtpForm email={email} sessionToken={token} />
    </AuthWrapper>
  );
}
