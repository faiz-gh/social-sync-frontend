import { ICreateClientRequest, IDeleteClientRequest, IGetClientRequest, IGetClientsByCompanyRequest, IGetClientsByEmployeeRequest, IQueryParams, IUpdateClientRequest } from "@/types";
import axios, { AxiosResponse } from "axios";

export async function createClient(payload: ICreateClientRequest): Promise<AxiosResponse> {
    return await axios.post('http://localhost:5500/client', payload);
}

export async function updateClient(payload: IUpdateClientRequest): Promise<AxiosResponse> {
    const queryParams: IQueryParams = {
        id: payload.id,
        employeeId: payload.employeeId,
        name: payload.name,
        email: payload.email
    }
    return await axios.put('http://localhost:5500/client?', new URLSearchParams(queryParams));
}

export async function removeClient(payload: IDeleteClientRequest): Promise<AxiosResponse> {
    return await axios.delete('http://localhost:5500/client/' + payload.id);
}

export async function getClient(payload: IGetClientRequest): Promise<AxiosResponse> {
    return await axios.get('http://localhost:5500/client/' + payload.id);
}

export async function getClientsByCompany(payload: IGetClientsByCompanyRequest): Promise<AxiosResponse> {
    return await axios.get('http://localhost:5500/client/company/' + payload.companyId);
}

export async function getClientsByEmployee(payload: IGetClientsByEmployeeRequest): Promise<AxiosResponse> {
    return await axios.get('http://localhost:5500/client/employee/' + payload.employeeId);
}
