export interface IIdentifyData {
  name: string;
  role: string;
  department: IDepartment;
  dob: string;
  gender: string;
  img: string[];
}

export interface IDepartment {
  department_id: number;
  department_name: string;
}
