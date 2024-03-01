import { ICreateEmployeeRequest, IGetEmployeeRequest, IGetEmployeesByCompanyRequest, IQueryParams, IUpdateEmployeeRequest } from "@/types";
import axios, { AxiosResponse } from "axios";

export async function createEmployee(payload: ICreateEmployeeRequest): Promise<AxiosResponse> {
    return await axios.post('http://localhost:5500/employee', payload);
}

export async function updateEmployee(payload: IUpdateEmployeeRequest): Promise<AxiosResponse> {
    const queryParams: IQueryParams = {
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        roleId: payload.roleId
    }
    return await axios.put('http://localhost:5500/employee?' + new URLSearchParams(queryParams));
}

export async function getEmployee(payload: IGetEmployeeRequest): Promise<AxiosResponse> {
    return await axios.get(`http://localhost:5500/employee/` + payload.id);
}

export async function getEmployeesByCompany(payload: IGetEmployeesByCompanyRequest): Promise<AxiosResponse> {
    return await axios.get(`http://localhost:5500/employee/company/` + payload.companyId);
}