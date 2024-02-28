import { Employee } from '@/app/(dashboard)/employees/page';
import { UserType } from '@/types';
import { atom, useAtom } from 'jotai';

const employee: UserType = {
    id: "1",
    first_name: "Faiz",
    last_name: "Ghanchi",
    email: "faiz@monke-labs.xyz",
    created_date: new Date("03-02-2024"),
}

export async function fetchEmployees(companyId?: string) {
    const apiUrl = `http://localhost:5500/employee/company/${companyId}`;

    // const response = await axios.get(apiUrl).then((res) => res.data);

    // return response.data;
}

export const employeeAtom = atom(employee);

export default function useEmployee() {
    const [employee, setEmployee] = useAtom(employeeAtom);
    // const { data: session } = useSession();

    // const companyId = session?.user.id;

    // fetchEmployees(companyId).then(
    //     (data) => setEmployee(data)
    // );

    function createEmployee(employee: UserType) {
        setEmployee(employee);
    }

    function updateEmployee(updatedEmployee: UserType) {
        // Use map to replace the object with the same id
        setEmployee(updatedEmployee);
    }

    return { employee, setEmployee, createEmployee, updateEmployee };
}
