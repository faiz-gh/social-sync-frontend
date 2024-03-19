import { atom, useAtom } from 'jotai';
import {
    ICreateEmployeeRequest, ICreateEmployeeResponse,
    IGetEmployeesByCompanyRequest, IGetEmployeesByCompanyResponse, IUpdateEmployeeRequest, IUpdateEmployeeResponse,
    UserType
} from '@/types';
import toast from "react-hot-toast";
import {routes} from "@/config/routes";
import {useRouter} from "next/navigation";
import {
    getEmployeesByCompany,
    createEmployee as addEmployee,
    updateEmployee as changeEmployee
} from "@/lib/apiRequests/employee";
import {USER_ROLE} from "@/config/enums";
import {useLocalStorage} from "react-use";

export const employeeAtom = atom<UserType[]>([]);
export const fetchEmployeeAtom = atom<boolean>(true);

export default function useEmployee() {
    const [employees, setEmployees] = useAtom(employeeAtom);
    const [fetchEmployee, setFetchEmployee] = useAtom(fetchEmployeeAtom);
    const router = useRouter();
    const user: UserType = useLocalStorage('user')[0] as UserType;

    if (fetchEmployee){
        fetchEmployees().then(
          () => setFetchEmployee(false)
        );
    }

    async function fetchEmployees() {
        if (!user){
            toast.error('User not logged in');
            router.push(routes.auth.signIn);
        }

        const payload: IGetEmployeesByCompanyRequest = {
            companyId: user?.id || ''
        }

        const response: IGetEmployeesByCompanyResponse = await getEmployeesByCompany(payload)

        if (response.statusText === 'OK' && response.data.data){
            setEmployees(response.data.data);
        } else {
            toast.error(response.data.message);
        }
    }

    function createEmployee(employee: {
        first_name: string;
        last_name: string;
        email: string;
    }) {
        if (!user){
            toast.error('User not logged in');
            router.push(routes.auth.signIn);
        }

        const payload: ICreateEmployeeRequest = {
            firstName: employee?.first_name || '',
            lastName: employee?.last_name || '',
            email: employee?.email || '',
            companyId: user?.id || ''
        }
        addEmployee(payload).then((response: ICreateEmployeeResponse) => {
            if (response.statusText === 'OK' && response.data.data){
                toast.success(response.data.message);
                setFetchEmployee(true);
            } else {
                toast.error(response.data.message);
            }
        });
    }

    function updateEmployee(updatedEmployee: {
        id: string;
        first_name: string;
        last_name: string;
    }) {
        if (!user){
            toast.error('User not logged in');
            router.push(routes.auth.signIn);
        }

        const payload: IUpdateEmployeeRequest = {
            id: updatedEmployee?.id || '',
            firstName: updatedEmployee?.first_name || '',
            lastName: updatedEmployee?.first_name || '',
            roleId: USER_ROLE.EMPLOYEE,
        }
        changeEmployee(payload).then((response: IUpdateEmployeeResponse) => {
            if (response.statusText === 'OK' && response.data.data){
                toast.success(response.data.message);
                setFetchEmployee(true);
            } else {
                toast.error(response.data.message);
            }
        });
    }

    return { employees, createEmployee, updateEmployee };
}
