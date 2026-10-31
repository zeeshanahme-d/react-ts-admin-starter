import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import { useSessionStore } from 'store/useSessionStore';

import { login } from '../_requests';

const useSignIn = () => {
  const setSession = useSessionStore((s) => s.setSession);

  const { mutate: loginMutate, isPending: isPendingLogin } = useMutation({
    mutationFn: login,
    onSuccess: ({ token, user }) => {
      setSession(token, user);
      message.success(`Welcome back, ${user.name}`);
    },
    onError: (error) => message.error(error.message),
  });

  return { loginMutate, isPendingLogin };
};

export default useSignIn;
