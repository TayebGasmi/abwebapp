export interface Role {
  id?:number,
  name:RoleName
}
export enum RoleName{
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}
