import {IGetEmployeesByCompanyRequest, IGetEmployeesByCompanyResponse, UserType} from '@/types';
import {Dispatch, SetStateAction, useState} from "react";
import {routes} from "@/config/routes";
import {getEmployeesByCompany} from "@/lib/apiRequests/employee";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function useEmployee() {
    const router = useRouter();

    async function fetchEmployees(setEmployees: Dispatch<SetStateAction<UserType[]>>) {
        const userStr = localStorage.getItem('user');
        const user: UserType = userStr ? JSON.parse(userStr) : null;

        if (!user){
            toast.error('User not logged in');
            router.push(routes.auth.signIn);
        }

        const payload: IGetEmployeesByCompanyRequest = {
            companyId: user?.id || ''
        }
        getEmployeesByCompany(payload).then((response: IGetEmployeesByCompanyResponse) => {
            if (response.statusText === 'OK' && response.data.data){
                setEmployees(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        });
    }

    return { fetchEmployees };
}
