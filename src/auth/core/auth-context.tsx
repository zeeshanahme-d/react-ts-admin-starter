import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import CustomLoader from 'components/custom-loader';

import { IAuthModel, IUserModel } from './_models';
import * as authHelper from './auth-helpers';

type IProps = {
  children: ReactNode;
};

type AuthContextProps = {
  auth: IAuthModel | undefined;
  saveAuth: (auth: IAuthModel | undefined) => void;
  currentUser: IUserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<IUserModel | undefined>>;
  logout: () => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }: IProps) {
  const [auth, setAuth] = useState<IAuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<IUserModel | undefined>();

  const saveAuth = useCallback((authData: IAuthModel | undefined) => {
    setAuth(authData);
    if (authData) {
      authHelper.setAuth(authData);
    } else {
      authHelper.removeAuth();
    }
  }, []);

  const logout = useCallback(() => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  }, [saveAuth]);

  const values = useMemo(
    () => ({ auth, saveAuth, currentUser, setCurrentUser, logout }),
    [auth, currentUser, logout, saveAuth]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function AuthInit({ children }: IProps) {
  const { auth, logout, setCurrentUser } = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  // Restore the (dummy) session from the stored token — no backend request.
  useEffect(() => {
    if (auth && auth.api_token) {
      try {
        const email = window.atob(auth.api_token.replace(/^dummy\./, ''));
        setCurrentUser({ email } as unknown as IUserModel);
      } catch {
        logout();
      }
    } else {
      logout();
    }
    setShowSplashScreen(false);
  }, [auth, logout, setCurrentUser]);

  return showSplashScreen ? <CustomLoader /> : children;
}

export { AuthProvider, useAuth, AuthInit };
