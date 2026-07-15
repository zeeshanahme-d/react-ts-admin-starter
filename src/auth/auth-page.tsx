import { Outlet, Route, Routes } from 'react-router-dom';

import SignIn from 'auth/sign-in';

function AuthPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path='sign-in' element={<SignIn />} />
        <Route index element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export { AuthPage };
