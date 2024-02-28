import { Client } from '@/app/(dashboard)/clients/page';
import { atom, useAtom } from 'jotai';

const client: Client = {
    id: 1,
    name: "Faiz",
    email: "faiz@monke-labs.xyz",
    createdDate: "03-02-2024",
    modifiedDate: "03-02-2024",
    employeeId: 1,
    totalAccounts: 5
}

export const clientAtom = atom(client);

export default function useClient() {
    const [client, setClient] = useAtom(clientAtom);

    function createClient(client: Client) {
        setClient(client);
    }

    function updateClient(updatedClient: Client) {
        // Use map to replace the object with the same id
        setClient(updatedClient);
    }

    return { client, setClient, createClient, updateClient };
}
