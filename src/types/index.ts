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

export type DefaultResponseType = {
  message: string;
  debugInfo?: string;
  timestamp?: string;
  error?: string;
}

/** Auth Response */
export interface IRegisterResponse extends Response {
  data: DefaultResponseType & {
    data?: UserType;
  };
}

export interface ILoginResponse extends Response {
  data: DefaultResponseType & {
    data?: LoginResponseType;
  };
}

export interface IVerifyOtpResponse extends Response {
  data: DefaultResponseType & {
    data?: UserType & {
      accessToken: string,
      refreshToken: string,
      idToken: string,
    };
  };
}

export interface IRefreshTokenResponse extends Response {
  data: DefaultResponseType & {
    data?: {
      accessToken: string,
      idToken: string,
    };
  };
}

export interface ILogoutResponse extends Response {
  data: DefaultResponseType & {
    data?: null;
  };
}

export interface IRemoveUserResponse extends Response {
  data: DefaultResponseType & {
    data?: null;
  };
}

/** Employee Response */
export interface ICreateEmployeeResponse extends Response {
  data: DefaultResponseType & {
    data?: UserType;
  };
}

export interface IUpdateEmployeeResponse extends Response {
  data: DefaultResponseType & {
    data?: UserType;
  };
}

export interface IGetEmployeeResponse extends Response {
  data: DefaultResponseType & {
    data?: UserType;
  };
}

export interface IGetEmployeesByCompanyResponse extends Response {
  data: DefaultResponseType & {
    data?: UserType[];
  };
}

/** Client Response */
export interface ICreateClientResponse extends Response {
  data: DefaultResponseType & {
    data?: ClientType;
  };
}

export interface IUpdateClientResponse extends Response {
  data: DefaultResponseType & {
    data?: ClientType;
  };
}

export interface IRemoveClientResponse extends Response {
  data: DefaultResponseType & {
    data?: ClientType;
  };
}

export interface IGetClientResponse extends Response {
  data: DefaultResponseType & {
    data?: ClientType;
  };
}

export interface IGetClientsByCompanyResponse extends Response {
  data: DefaultResponseType & {
    data?: ClientType[];
  };
}

export interface IGetClientsByEmployeeResponse extends Response {
  data: DefaultResponseType & {
    data?: ClientType[];
  };
}

/** Account Response */
export interface ICreateAccountResponse extends Response {
  data: DefaultResponseType & {
    data?: AccountType;
  };
}

export interface IUpdateAccountResponse extends Response {
  data: DefaultResponseType & {
    data?: AccountType;
  };
}

export interface IRemoveAccountResponse extends Response {
  data: DefaultResponseType & {
    data?: AccountType;
  };
}

export interface IGetAccountResponse extends Response {
  data: DefaultResponseType & {
    data?: AccountType;
  };
}

export interface IGetAccountsByClientResponse extends Response {
  data: DefaultResponseType & {
    data?: AccountType[];
  };
}

/** Post Response */
export interface ICreatePostResponse extends Response {
  data: DefaultResponseType & {
    data?: {
      post: PostType,
      postResponse: unknown
    }
  };
}

export interface IGetPostResponse extends Response {
  data: DefaultResponseType & {
    data?: PostType;
  };
}

export interface IGetPostsByAccountResponse extends Response {
  data: DefaultResponseType & {
    data?: PostType[];
  };
}

export interface IGetPostsByClientResponse extends Response {
  data: DefaultResponseType & {
    data?: PostType[];
  };
}

/** Event Response */
export interface ICreateEventResponse extends Response {
  data: DefaultResponseType & {
    data?: EventType;
  };
}

export interface IUpdateEventResponse extends Response {
  data: DefaultResponseType & {
    data?: EventType;
  };
}

export interface IDeleteEventResponse extends Response {
  data: DefaultResponseType & {
    data?: EventType;
  };
}

export interface IGetEventResponse extends Response {
  data: DefaultResponseType & {
    data?: EventType;
  };
}

export interface IGetEventsByCompanyResponse extends Response {
  data: DefaultResponseType & {
    data?: EventType[];
  };
}
