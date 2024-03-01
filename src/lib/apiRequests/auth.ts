import axios, { AxiosResponse } from "axios";
import { ILoginRequest, ILogoutRequest, IRefreshTokenRequest, IRegisterRequest, IVerifyOtpRequest } from "@/types";

export async function register(payload: IRegisterRequest): Promise<AxiosResponse> {
    return await axios.post('http://localhost:5500/auth/register', payload);
}

export async function login(payload: ILoginRequest): Promise<AxiosResponse> {
    return await axios.post('http://localhost:5500/auth/login', payload);
}

export async function verifyOtp(payload: IVerifyOtpRequest): Promise<AxiosResponse> {
    return await axios.post('http://localhost:5500/auth/verify-otp', payload);
}

export async function refreshToken(payload: IRefreshTokenRequest): Promise<AxiosResponse> {
    return await axios.post('http://localhost:5500/auth/refresh-token', payload);
}

export async function logout(payload: ILogoutRequest): Promise<AxiosResponse> {
    return await axios.post('http://localhost:5500/auth/logout', payload);
}
