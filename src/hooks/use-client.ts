import { atom, useAtom } from 'jotai';
import {
    ClientType, ICreateClientRequest, ICreateClientResponse,
    IGetClientsByCompanyRequest,
    IGetClientsByCompanyResponse,
    IGetClientsByEmployeeRequest,
    IGetClientsByEmployeeResponse, IUpdateClientRequest, IUpdateClientResponse,
    UserType
} from '@/types';
import {
    getClientsByCompany,
    getClientsByEmployee,
    createClient as addClient,
    updateClient as changeClient,
} from "@/lib/apiRequests/client";
import toast from "react-hot-toast";
import {routes} from "@/config/routes";
import {useRouter} from "next/navigation";
import {useLocalStorage} from "react-use";

export const clientsByCompanyAtom = atom<ClientType[]>([]);
export const clientsByEmployeeAtom = atom<ClientType[]>([]);
export const fetchClientsByCompanyAtom = atom<boolean>(true);

export default function useClient() {
    const [clientsByEmployee, setClientsByEmployee] = useAtom(clientsByEmployeeAtom);
    const [clientsByCompany, setClientsByCompany] = useAtom(clientsByCompanyAtom);
    const [fetchClientByCompany, setFetchClientByCompany] = useAtom(fetchClientsByCompanyAtom);
    const router = useRouter();
    const user: UserType = useLocalStorage('user')[0] as UserType;

    if (fetchClientByCompany){
        fetchClientsByCompany().then(
          () => setFetchClientByCompany(false)
        );
    }

    async function fetchClientsByCompany() {
        if (!user){
            toast.error('User not logged in');
            router.push(routes.auth.signIn);
        }

        const payload: IGetClientsByCompanyRequest = {
            companyId: user?.id || ''
        }
        getClientsByCompany(payload).then((response: IGetClientsByCompanyResponse) => {
            if (response.statusText === 'OK' && response.data.data){
                setClientsByCompany(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        });
    }

    async function fetchClientsByEmployee(employeeId: string) {
        if (!user){
            toast.error('User not logged in');
            router.push(routes.auth.signIn);
        }

        const payload: IGetClientsByEmployeeRequest = {
            employeeId: employeeId
        }
        getClientsByEmployee(payload).then((response: IGetClientsByEmployeeResponse) => {
            if (response.statusText === 'OK' && response.data.data){
                setClientsByEmployee(response.data.data)
            } else {
                toast.error(response.data.message)
            }
        });
    }

    function createClient(client: {
        name: string;
        email: string;
        employeeId: string;
    }) {
        if (!user){
            toast.error('User not logged in');
            router.push(routes.auth.signIn);
        }

        const payload: ICreateClientRequest = {
            name: client.name,
            email: client.email,
            companyId: user?.id || '',
            employeeId: client.employeeId
        }
        addClient(payload).then((response: ICreateClientResponse) => {
            if (response.statusText === 'OK' && response.data.data){
                toast.success(response.data.message);
                setFetchClientByCompany(true);
            } else {
                toast.error(response.data.message);
            }
        });
    }

    function updateClient(updatedClient: {
        id: string;
        name: string;
        email: string;
        employeeId: string;
    }) {
        if (!user){
            toast.error('User not logged in');
            router.push(routes.auth.signIn);
        }

        const payload: IUpdateClientRequest = {
            id: updatedClient.id,
            name: updatedClient.name,
            email: updatedClient.email,
            employeeId: updatedClient.employeeId
        }
        changeClient(payload).then((response: IUpdateClientResponse) => {
            if (response.statusText === 'OK' && response.data.data){
                toast.success(response.data.message);
                setFetchClientByCompany(true);
            } else {
                toast.error(response.data.message);
            }
        });
    }

    return { clientsByCompany, clientsByEmployee, createClient, updateClient, fetchClientsByEmployee };
}
