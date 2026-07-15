import { useState } from 'react';

import { message } from 'antd';

import { ISignInForm, IUserModel } from '../_models';
import { useAuth } from '../auth-context';

// Dummy credentials for the demo login (no backend).
export const DUMMY_CREDENTIALS = {
  email: 'admin@nearby.com',
  password: 'admin123',
};

const useSignIn = () => {
  const { saveAuth, setCurrentUser } = useAuth();
  const [isPendingLogin, setIsPendingLogin] = useState(false);

  const loginMutate = (values: ISignInForm) => {
    setIsPendingLogin(true);
    const email = String(values.email).trim().toLowerCase();

    // Simulate a short async request so the button shows its loading state.
    window.setTimeout(() => {
      // Persist a lightweight session token (email encoded) to localStorage.
      const token = `dummy.${window.btoa(email)}`;
      saveAuth({ api_token: token });
      setCurrentUser({ email } as unknown as IUserModel);
      message.success('Logged in successfully.');
      setIsPendingLogin(false);
    }, 400);
  };

  return {
    loginMutate,
    isPendingLogin,
  };
};

export default useSignIn;
