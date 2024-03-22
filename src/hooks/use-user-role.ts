import {atom, useAtom} from 'jotai';
import {USER_ROLE} from "@/config/enums";
import Cookies from "js-cookie";

export const userRoleAtom = atom<USER_ROLE>(USER_ROLE.COMPANY);

export default function useUserRole() {
  const [userRole, setUserRole] = useAtom(userRoleAtom);
  const role: USER_ROLE = Cookies.get('user_role') as USER_ROLE || USER_ROLE.COMPANY;

  setUserRole(role);

  return { userRole };
}
