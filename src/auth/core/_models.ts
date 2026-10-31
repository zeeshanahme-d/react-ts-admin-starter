import { ID, Role } from 'helpers/crud-helper/models';

export interface IUserModel {
  _id: ID;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

export interface ISignInForm {
  email: string;
  password: string;
}
