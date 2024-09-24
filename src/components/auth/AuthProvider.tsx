import React, { createContext, useReducer, useEffect, useMemo, ReactNode } from "react";
import { authActions } from "../../app/actions";

interface AuthState {
  authenticated: boolean;
  userName: string;
  email: string;
}

interface AuthAction {
  type: string;
  payload?: {
    userName: string;
    email: string;
  };
}

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const initialState: AuthState = {
  authenticated: false,
  userName: "",
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
        userName: action.payload?.userName || "",
        email: action.payload?.email || ""
      };
    case authActions.LOGOUT:
      return initialState;
    case authActions.UPDATE_USER:
      return {
        ...state,
        userName: action.payload?.userName || "",
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
    const storedData = localStorage.getItem("authState");
    return storedData ? JSON.parse(storedData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
