import { AxiosResponse } from "axios";
import axios from "@/lib/axios";

import {
  IGetCompanyDashboardAnalyticsResponse, IGetCompanyDashboardAnalyticsRequest
} from "@/types";

export async function getCompanyDashboardAnalytics(payload: IGetCompanyDashboardAnalyticsRequest): Promise<AxiosResponse> {
  return await axios.get('/analytics/company/' + payload.companyId, {
    validateStatus: () => true
  });
}
