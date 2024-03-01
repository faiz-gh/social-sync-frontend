import axios, { AxiosResponse } from "axios";

import { ICreateAccountRequest, IUpdateAccountRequest, IDeleteAccountRequest, IGetAccountRequest, IGetAccountsByClientRequest, IQueryParams } from "@/types";

export async function createAccount(payload: ICreateAccountRequest): Promise<AxiosResponse> {
    return await axios.post('http://localhost:5500/account', payload);
}

export async function updateAccount(payload: IUpdateAccountRequest): Promise<AxiosResponse> {
    const queryParams: IQueryParams = {
        id: payload.id,
        accountType: payload.accountType,
        accessToken: payload.accessToken
    }
    return await axios.put('http://localhost:5500/account?' + new URLSearchParams(queryParams));
}

export async function removeAccount(payload: IDeleteAccountRequest): Promise<AxiosResponse> {
    return await axios.delete('http://localhost:5500/account/' + payload.id);
}

export async function getAccount(payload: IGetAccountRequest): Promise<AxiosResponse> {
    return await axios.get('http://localhost:5500/account/' + payload.id);
}

export async function getAccountsByClient(payload: IGetAccountsByClientRequest): Promise<AxiosResponse> {
    return await axios.get('http://localhost:5500/account/client/' + payload.clientId);
}