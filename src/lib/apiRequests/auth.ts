import { AxiosResponse } from "axios";
import axios from "@/lib/axios";
import { ILoginRequest, ILogoutRequest, IRefreshTokenRequest, IRegisterRequest, IVerifyOtpRequest } from "@/types";

export async function register(payload: IRegisterRequest): Promise<AxiosResponse> {
    return await axios.post('/auth/register', payload, {
        validateStatus: () => true
    });
}

export async function login(payload: ILoginRequest): Promise<AxiosResponse> {
    return await axios.post('/auth/login', payload, {
        validateStatus: () => true
    });
}

export async function verifyOtp(payload: IVerifyOtpRequest): Promise<AxiosResponse> {
    return await axios.post('/auth/verify-otp', payload, {
        validateStatus: () => true
    });
}

export async function refreshToken(payload: IRefreshTokenRequest): Promise<AxiosResponse> {
    return await axios.post('/auth/refresh-token', payload, {
        validateStatus: () => true
    });
}

export async function logout(payload: ILogoutRequest): Promise<AxiosResponse> {
    return await axios.post('/auth/logout', payload, {
        validateStatus: () => true
    });
}
