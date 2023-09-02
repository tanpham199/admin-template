import { DAYJS_FORMAT } from '@/constants';
import { HttpStatusCode } from 'axios';
import dayjs from 'dayjs';

export const isNotLoginError = (error: any) => error?.response?.status !== HttpStatusCode.Unauthorized;

export const formatDateTime = (timestamp?: Parameters<typeof dayjs>[0]) => dayjs(timestamp).format(DAYJS_FORMAT);
