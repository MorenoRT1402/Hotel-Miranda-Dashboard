import React, { createContext, useReducer, useEffect, useMemo, ReactNode } from "react";
import { authActions } from "../../app/actions";
import { getUser, saveUser } from "../../utils/persistence";
import { AuthState } from '../../types/auth.types'

interface AuthAction {
  type: string;
  payload?: {
    username: string;
    email: string;
  };
}

const initialState: AuthState = {
  authenticated: false,
  username: "",
  email: ""
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case authActions.LOGIN:
      return {
        ...state,
        authenticated: true,
        username: action.payload?.username || "",
        email: action.payload?.email || ""
      };
    case authActions.LOGOUT:
      return initialState;
    case authActions.UPDATE_USER:
      return {
        ...state,
        username: action.payload?.username || "",
        email: action.payload?.email || ""
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, () => {
    const storedData = getUser();
    return storedData ? storedData : initialState;
  });

  useEffect(() => {
    saveUser(state);
  }, [state]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
