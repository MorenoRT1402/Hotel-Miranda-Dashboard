import { AuthState } from "../types/auth.types";

const tokenKey = 'hmtk';
export const saveToken = (token:string) => localStorage.setItem(tokenKey, token);

export const getToken = () => localStorage.getItem(tokenKey);

export const deleteToken = () => localStorage.removeItem(tokenKey);

const userKey = 'hmdas';

export const saveUser = (user: AuthState) => localStorage.setItem(userKey, JSON.stringify(user));
  
  export const getUser = () => {
    const storedUser = localStorage.getItem(userKey);
    return storedUser ? JSON.parse(storedUser) : null;
  };
  
  export const deleteUser = () => localStorage.removeItem(userKey);