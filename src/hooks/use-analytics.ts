import { atom, useAtom } from 'jotai';
import {
  CompanyDashboardAnalyticsType,
  IGetCompanyDashboardAnalyticsRequest,
  IGetCompanyDashboardAnalyticsResponse,
  UserType
} from '@/types';
import toast from "react-hot-toast";
import {routes} from "@/config/routes";
import {useRouter} from "next/navigation";
import {getCompanyDashboardAnalytics} from "@/lib/apiRequests/analytics";
import {useLocalStorage} from "react-use";

const defaultAnalytics: CompanyDashboardAnalyticsType = {
  total_accounts: 0,
  total_employees: 0,
  total_clients: 0,
  total_posts: 0
}

export const dashboardAnalyticsAtom = atom<CompanyDashboardAnalyticsType>(defaultAnalytics);
export const fetchDashboardAnalyticsAtom = atom<boolean>(true);

export default function useAnalytics() {
  const [companyDashboardAnalytics, setCompanyDashboardAnalytics] = useAtom(dashboardAnalyticsAtom);
  const [fetchAnalytics, setFetchAnalytics] = useAtom(fetchDashboardAnalyticsAtom);
  const router = useRouter();
  const user: UserType = useLocalStorage('user')[0] as UserType;

  if (fetchAnalytics){
    fetchCompanyDashboardAnalytics().then(
      () => setFetchAnalytics(false)
    );
  }

  async function fetchCompanyDashboardAnalytics() {
    if (!user){
      toast.error('User not logged in');
      router.push(routes.auth.signIn);
    }

    const payload: IGetCompanyDashboardAnalyticsRequest = {
      companyId: user?.id || ''
    }

    const response: IGetCompanyDashboardAnalyticsResponse = await getCompanyDashboardAnalytics(payload)

    if (response.statusText === 'OK' && response.data.data){
      setCompanyDashboardAnalytics(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  }

  return { companyDashboardAnalytics, fetchCompanyDashboardAnalytics };
}
