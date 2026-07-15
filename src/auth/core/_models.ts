import { ID, ITimeStamps, Role } from 'helpers/crud-helper/models';

export interface IAuthModel {
  api_token: string;
}

interface IAddress {
  _id: string;
}

export interface IUserModel extends ITimeStamps {
  _id: ID;
  phoneNumber: string;
  weeklyPreference: string;
  balance: number;
  role: Role;
  addresses: IAddress[];
}

export interface ISignInForm {
  email: number | string;
  password: string;
}
