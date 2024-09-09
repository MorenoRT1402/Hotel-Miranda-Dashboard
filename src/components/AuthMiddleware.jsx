import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { pages } from '../app/pages';

export const AuthMiddleware = () => {
  const { state } = useContext(AuthContext);

  if (!state.authenticated) {
    return <Navigate to={pages.login.path} replace />;
  }

  return <Outlet />;
};
