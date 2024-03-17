import { ICreateEmployeeRequest, IGetEmployeeRequest, IGetEmployeesByCompanyRequest, IQueryParams, IUpdateEmployeeRequest } from "@/types";
import { AxiosResponse } from "axios";
import axios from "@/lib/axios";

export async function createEmployee(payload: ICreateEmployeeRequest): Promise<AxiosResponse> {
    return await axios.post('/employee', payload, {
        validateStatus: () => true
    });
}

export async function updateEmployee(payload: IUpdateEmployeeRequest): Promise<AxiosResponse> {
    const queryParams: IQueryParams = {
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        roleId: payload.roleId
    }
    return await axios.put('/employee?' + new URLSearchParams(queryParams), {}, {
        validateStatus: () => true
    });
}

export async function getEmployee(payload: IGetEmployeeRequest): Promise<AxiosResponse> {
    return await axios.get(`/employee/` + payload.id, {
        validateStatus: () => true
    });
}

export async function getEmployeesByCompany(payload: IGetEmployeesByCompanyRequest): Promise<AxiosResponse> {
    return await axios.get(`/employee/company/` + payload.companyId, {
        validateStatus: () => true
    });
}
