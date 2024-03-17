import { AxiosResponse } from "axios";
import axios from "@/lib/axios";

import { ICreateAccountRequest, IUpdateAccountRequest, IDeleteAccountRequest, IGetAccountRequest, IGetAccountsByClientRequest, IQueryParams } from "@/types";

export async function createAccount(payload: ICreateAccountRequest): Promise<AxiosResponse> {
    return await axios.post('/account', payload, {
        validateStatus: () => true
    });
}

export async function updateAccount(payload: IUpdateAccountRequest): Promise<AxiosResponse> {
    const queryParams: IQueryParams = {
        id: payload.id,
        accountType: payload.accountType,
        accessToken: payload.accessToken
    }
    return await axios.put('/account?' + new URLSearchParams(queryParams), {}, {
        validateStatus: () => true
    });
}

export async function removeAccount(payload: IDeleteAccountRequest): Promise<AxiosResponse> {
    return await axios.delete('/account/' + payload.id, {
        validateStatus: () => true
    });
}

export async function getAccount(payload: IGetAccountRequest): Promise<AxiosResponse> {
    return await axios.get('/account/' + payload.id, {
        validateStatus: () => true
    });
}

export async function getAccountsByClient(payload: IGetAccountsByClientRequest): Promise<AxiosResponse> {
    return await axios.get('/account/client/' + payload.clientId, {
        validateStatus: () => true
    });
}
