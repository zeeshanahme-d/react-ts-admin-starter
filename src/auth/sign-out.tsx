import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useSessionStore } from 'store/useSessionStore';

export function SignOut() {
  const logout = useSessionStore((s) => s.logout);
  useEffect(() => {
    logout();
    // Full reload also drops the react-query cache, so the next user never sees stale data.
    document.location.reload();
  }, [logout]);

  return <Navigate to='/auth/sign-in' />;
}
