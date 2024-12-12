export const BACKEND_HTTPS_IP = import.meta.env.VITE_BACKEND_HTTPS_IP;
export const BACKEND_HTTPS_API = import.meta.env.VITE_BACKEND_HTTPS_IP + "/api";

export const LOGIN_IP = BACKEND_HTTPS_API + "/auth/login";

export const GET_IDENTIFY_DATA_IP = BACKEND_HTTPS_API + "/identity-data/get";

export const GET_INSTITUE_CALENDAR_DATA_IP =
  BACKEND_HTTPS_API + "/institude-calendar/get";
export const UPDATE_INSTITUE_CALENDAR_DATA_IP =
  BACKEND_HTTPS_API + "/institude-calendar/post";

export const GET_EVENT_DATA_IP = BACKEND_HTTPS_API + "/event/get";
export const CREATE_EVENT_DATA_IP = BACKEND_HTTPS_API + "/event/post";
export const UPDATE_EVENT_DATA_IP = BACKEND_HTTPS_API + "/event/update";
export const DELETE_EVENT_DATA_IP = BACKEND_HTTPS_API + "/event/delete";

export const GET_APPOINTMENT_STATISTIC_ALL_TIME =
  BACKEND_HTTPS_API + "/appointments/get";
export const GET_APPOINTMENT_STATISTIC_BY_YEAR =
  BACKEND_HTTPS_API + "/appointments/stats/all-month";
export const GET_APPOINTMENT_STATISTIC_BY_MONTH =
  BACKEND_HTTPS_API + "/appointments/stats/by-month";
export const GET_APPOINTMENT_STATISTIC_BY_DEPARTMENTS =
  BACKEND_HTTPS_API + "/appointments/stats/by-department";
