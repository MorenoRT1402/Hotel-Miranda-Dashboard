/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect, useMemo } from "react";
import { authActions } from "../app/actions";

export const AuthContext = createContext();

const initialState = {
  authenticated: false,
  userName: "",
  email: ""
};

const authReducer = (state, action) => {
  switch (action.type) {
    case authActions.LOGIN:
      return {
        ...state,
        authenticated: true,
        userName: action.payload.userName,
        email: action.payload.email
      };
    case authActions.LOGOUT:
      return {
        initialState
      };
    case authActions.UPDATE_USER:
      return {
        ...state,
        userName: action.payload.userName,
        email: action.payload.email
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
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
