import { AxiosResponse } from "axios";
import axios from "@/lib/axios";
import {
    ICreatePostRequest,
    IGetPostRequest,
    IGetPostsByAccountRequest,
    IGetPostsByClientRequest, IGetPostsByCompanyRequest,
    IGetPostsByEmployeeRequest
} from "@/types";

export async function createPost(payload: ICreatePostRequest): Promise<AxiosResponse> {
    return await axios.post('/post', payload, {
        validateStatus: () => true
    });
}

export async function getPost(payload: IGetPostRequest): Promise<AxiosResponse> {
    return await axios.get('/post/' + payload.id, {
        validateStatus: () => true
    });
}

export async function getPostsByAccount(payload: IGetPostsByAccountRequest): Promise<AxiosResponse> {
    return await axios.get('/post/account/' + payload.accountId, {
        validateStatus: () => true
    });
}

export async function getPostsByClient(payload: IGetPostsByClientRequest): Promise<AxiosResponse> {
    return await axios.get('/post/client/' + payload.clientId, {
        validateStatus: () => true
    });
}

export async function getPostsByEmployee(payload: IGetPostsByEmployeeRequest): Promise<AxiosResponse> {
    return await axios.get('/post/employee/' + payload.employeeId, {
        validateStatus: () => true
    });
}

export async function getPostsByCompany(payload: IGetPostsByCompanyRequest): Promise<AxiosResponse> {
    return await axios.get('/post/company/' + payload.companyId, {
        validateStatus: () => true
    });
}
