import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { pages } from '../../app/pages';

export const AuthMiddleware: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthMiddleware debe estar envuelto dentro de AuthProvider");
  }

  const { state } = authContext;

  if (!state.authenticated) {
    return <Navigate to={pages.login.path} replace />;
  }

  return <Outlet />;
};
