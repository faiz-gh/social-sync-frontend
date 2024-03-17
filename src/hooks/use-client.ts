import {
    ClientType,
    IGetClientsByCompanyRequest,
    IGetClientsByCompanyResponse,
    IGetClientsByEmployeeRequest,
    IGetClientsByEmployeeResponse,
    IGetEmployeesByCompanyRequest,
    IGetEmployeesByCompanyResponse,
    UserType
} from '@/types';
import {Dispatch, SetStateAction, useState} from "react";
import {routes} from "@/config/routes";
import {getEmployeesByCompany} from "@/lib/apiRequests/employee";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {getClientsByCompany, getClientsByEmployee} from "@/lib/apiRequests/client";


export default function useClient() {
    const router = useRouter();

    async function fetchClientsByCompany(setClients: Dispatch<SetStateAction<ClientType[]>>) {
        const userStr = localStorage.getItem('user');
        const user: UserType = userStr ? JSON.parse(userStr) : null;

        if (!user){
            toast.error('User not logged in');
            router.push(routes.auth.signIn);
        }

        const payload: IGetClientsByCompanyRequest = {
            companyId: user?.id || ''
        }
        getClientsByCompany(payload).then((response: IGetClientsByCompanyResponse) => {
            if (response.statusText === 'OK' && response.data.data){
                setClients(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        });
    }

    async function fetchClientsByEmployee(employeeId: string, setClients: Dispatch<SetStateAction<ClientType[]>>) {
        const userStr = localStorage.getItem('user');
        const user: UserType = userStr ? JSON.parse(userStr) : null;

        if (!user){
            toast.error('User not logged in');
            router.push(routes.auth.signIn);
        }

        const payload: IGetClientsByEmployeeRequest = {
            employeeId: employeeId
        }
        getClientsByEmployee(payload).then((response: IGetClientsByEmployeeResponse) => {
            if (response.statusText === 'OK' && response.data.data){
                setClients(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        });
    }

    return { fetchClientsByCompany, fetchClientsByEmployee };
}
