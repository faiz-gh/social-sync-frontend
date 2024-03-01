import { AxiosResponse } from "axios";

/** Standard Types */
export type UserType = {
  id?: string;
  role_id?: number;
  aws_user_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  created_date?: Date;
  last_modified?: Date;
  is_deleted?: boolean;
  total_clients?: number;
  company_id?: string;
}

export type LoginResponseType = {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  ChallengeName: string;
  ChallengeParameters: {
    USERNAME: string;
    email: string;
  };
  Session: string;
}

export type ClientType = {
  id?: string;
  company_id?: string;
  employee_id?: string;
  name?: string;
  email?: string;
  created_date?: Date;
  last_modified?: Date;
  is_deleted?: boolean;
  total_accounts?: number;
}

export type AccountType = {
  id?: string;
  client_id?: string;
  account_type?: string;
  access_token?: string;
  created_date?: Date;
  last_modified?: Date;
  is_deleted?: boolean;
  total_posts?: number;
}

export type PostType = {
  id?: string;
  account_id?: string;
  media?: string[];
  location?: string;
  description?: string;
  tags?: string[];
  post_schedule?: Date;
  created_date?: Date;
  last_modified?: Date;
  is_deleted?: boolean;
}

export type EventType = {
  id?: string;
  company_id?: string;
  title?: string;
  description?: string;
  location?: string;
  start_date?: Date;
  end_date?: Date;
  created_date?: Date;
  last_modified?: Date;
  is_deleted?: boolean;
}

export type FeedbackType = {
  id?: string;
  user_id?: string;
  subject?: string;
  description?: string;
  created_date?: Date;
  is_opened?: boolean;
  is_deleted?: boolean;
}

/** Response Interfaces */
export type DefaultResponseType = {
  message: string;
  debugInfo?: string;
  timestamp?: string;
  error?: string;
}

// Auth Response
export interface IRegisterResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: UserType;
  };
}

export interface ILoginResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: LoginResponseType;
  };
}

export interface IVerifyOtpResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: UserType & {
      accessToken: string,
      refreshToken: string,
      idToken: string,
    };
  };
}

export interface IRefreshTokenResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: {
      accessToken: string,
      idToken: string,
    };
  };
}

export interface ILogoutResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: null;
  };
}

export interface IRemoveUserResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: null;
  };
}

// Employee Response
export interface ICreateEmployeeResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: UserType;
  };
}

export interface IUpdateEmployeeResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: UserType;
  };
}

export interface IGetEmployeeResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: UserType;
  };
}

export interface IGetEmployeesByCompanyResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: UserType[];
  };
}

// Client Response
export interface ICreateClientResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: ClientType;
  };
}

export interface IUpdateClientResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: ClientType;
  };
}

export interface IRemoveClientResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: ClientType;
  };
}

export interface IGetClientResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: ClientType;
  };
}

export interface IGetClientsByCompanyResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: ClientType[];
  };
}

export interface IGetClientsByEmployeeResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: ClientType[];
  };
}

// Account Response
export interface ICreateAccountResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: AccountType;
  };
}

export interface IUpdateAccountResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: AccountType;
  };
}

export interface IRemoveAccountResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: AccountType;
  };
}

export interface IGetAccountResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: AccountType;
  };
}

export interface IGetAccountsByClientResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: AccountType[];
  };
}

// Post Response
export interface ICreatePostResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: {
      post: PostType,
      postResponse: unknown
    }
  };
}

export interface IGetPostResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: PostType;
  };
}

export interface IGetPostsByAccountResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: PostType[];
  };
}

export interface IGetPostsByClientResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: PostType[];
  };
}

// Event Response
export interface ICreateEventResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: EventType;
  };
}

export interface IUpdateEventResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: EventType;
  };
}

export interface IDeleteEventResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: EventType;
  };
}

export interface IGetEventResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: EventType;
  };
}

export interface IGetEventsByCompanyResponse extends AxiosResponse {
  data: DefaultResponseType & {
    data?: EventType[];
  };
}

/** Request Interfaces */

// Auth Service
export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
}

export interface ILoginRequest {
  email: string;
}

export interface IVerifyOtpRequest {
  email: string;
  code: string;
  session: string;
}

export interface IRefreshTokenRequest {
  awsUserId: string;
  refreshToken: string;
}

export interface ILogoutRequest {
  accessToken: string;
}

export interface IRemoveUserRequest {
  email: string;
  accessToken: string;
}

// Employee Service
export interface ICreateEmployeeRequest {
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IUpdateEmployeeRequest {
  id: string;
  firstName: string;
  lastName: string;
  roleId: string;
}

export interface IGetEmployeesByCompanyRequest {
  companyId: string;
}

export interface IGetEmployeeRequest {
  id: string;
}

// Client Service
export interface ICreateClientRequest {
  companyId: string;
  employeeId: string;
  name: string;
  email: string;
}

export interface IUpdateClientRequest {
  id: string;
  employeeId: string;
  name: string;
  email: string;
}

export interface IDeleteClientRequest {
  id: string;
}

export interface IGetClientRequest {
  id: string;
}

export interface IGetClientsByCompanyRequest {
  companyId: string;
}

export interface IGetClientsByEmployeeRequest {
  employeeId: string;
}

// Account Service
export interface ICreateAccountRequest {
  clientId: string;
  accountType: string;
  accessToken: string;
}

export interface IUpdateAccountRequest {
  id: string;
  accountType: string;
  accessToken: string;
}

export interface IDeleteAccountRequest {
  id: string;
}

export interface IGetAccountRequest {
  id: string;
}

export interface IGetAccountsByClientRequest {
  clientId: string;
}

// Post Service
export interface ICreatePostRequest {
  accountId: string;
  media?: string[];
  location?: string;
  description: string;
  tags?: string[];
  postSchedule?: Date;
}

export interface IUpdatePostRequest {
  id: string;
  media: string[];
  location: string;
  description: string;
  tags: string[];
  postSchedule: Date;
}

export interface IDeletePostRequest {
  id: string;
}

export interface IGetPostRequest {
  id: string;
}

export interface IGetPostsByAccountRequest {
  accountId: string;
}

export interface IGetPostsByClientRequest {
  clientId: string;
}

// Event Service
export interface ICreateEventRequest {
  companyId: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}

export interface IUpdateEventRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}

export interface IDeleteEventRequest {
  id: string;
}

export interface IGetEventRequest {
  id: string;
}

export interface IGetEventsByCompanyRequest {
  companyId: string;
}

// Feedback Service
export interface ICreateFeedbackRequest {
  userId: string;
  subject: string;
  description: string;
}

export interface IUpdateFeedbackRequest {
  id: string;
  subject: string;
  description: string;
  isOpened?: boolean;
}

export interface IDeleteFeedbackRequest {
  id: string;
}

export interface IGetFeedbackRequest {
  id: string;
}

export interface IGetFeedbacksByUserRequest {
  userId: string;
}

export interface IQueryParams {
  [key: string]: string
}