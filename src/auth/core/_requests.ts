import { ISignInForm, IUserModel } from './_models';

export interface ILoginResponse {
  token: string;
  user: IUserModel;
}

// Dummy accounts until the backend exists.
export const DUMMY_USERS: (IUserModel & { password: string })[] = [
  {
    _id: '1',
    name: 'Sara Ahmed',
    email: 'admin@nearby.com',
    password: 'admin123',
    role: 'ADMIN',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    _id: '2',
    name: 'Ali Khan',
    email: 'user@nearby.com',
    password: 'user123',
    role: 'USER',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
];

// ponytail: fake login, replace the body with `(await axios.post<ILoginResponse>('auth/login', body)).data` when the API is ready.
export async function login({ email, password }: ISignInForm): Promise<ILoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const match = DUMMY_USERS.find((u) => u.email === email.trim().toLowerCase() && u.password === password);
  if (!match) throw new Error('Invalid email or password');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...user } = match;
  return { token: `dummy.${window.btoa(user.email)}`, user };
}
