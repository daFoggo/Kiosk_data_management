export interface IMonthStat {
  thang: number;
  so_luong: number;
}

export interface IDepartmentStat {
  department_name: string;
  appointments: number;
}

export interface IAppointmentData {
  start_time: string;
  end_time: string;
  location: string;
  status: string;
  participants: IParticipant[];
}

export interface IParticipant {
  name: string;
  create: boolean
}
