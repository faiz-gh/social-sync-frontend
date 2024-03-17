import { ICreateClientRequest, IDeleteClientRequest, IGetClientRequest, IGetClientsByCompanyRequest, IGetClientsByEmployeeRequest, IQueryParams, IUpdateClientRequest } from "@/types";
import { AxiosResponse } from "axios";
import axios from "@/lib/axios";

export async function createClient(payload: ICreateClientRequest): Promise<AxiosResponse> {
    return await axios.post('/client', payload, {
        validateStatus: () => true
    });
}

export async function updateClient(payload: IUpdateClientRequest): Promise<AxiosResponse> {
    const queryParams: IQueryParams = {
        id: payload.id,
        employeeId: payload.employeeId,
        name: payload.name,
        email: payload.email
    }
    return await axios.put('/client?' + new URLSearchParams(queryParams), {}, {
        validateStatus: () => true
    });
}

export async function removeClient(payload: IDeleteClientRequest): Promise<AxiosResponse> {
    return await axios.delete('/client/' + payload.id, {
        validateStatus: () => true
    });
}

export async function getClient(payload: IGetClientRequest): Promise<AxiosResponse> {
    return await axios.get('/client/' + payload.id, {
        validateStatus: () => true
    });
}

export async function getClientsByCompany(payload: IGetClientsByCompanyRequest): Promise<AxiosResponse> {
    return await axios.get('/client/company/' + payload.companyId, {
        validateStatus: () => true
    });
}

export async function getClientsByEmployee(payload: IGetClientsByEmployeeRequest): Promise<AxiosResponse> {
    return await axios.get('/client/employee/' + payload.employeeId, {
        validateStatus: () => true
    });
}
