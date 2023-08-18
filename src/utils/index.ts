import { HttpStatusCode } from 'axios';

export const isNotLoginError = (error: any) => error?.response?.status !== HttpStatusCode.Unauthorized;
