import axios from 'axios';
import { API_URL } from './api';
import { deleteToken, saveToken } from '../utils/persistence';
import { UserData } from '../types/auth.types';

interface LoginParams {
    username?: string;
    email?: string;
    password: string;
}

export const onLogin = async (data: LoginParams): Promise<UserData | null> => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, data);

        if (res.data?.token) {
            saveToken(res.data.token);
            return res.data.user;
        }
        return null;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error de autenticación:', error.response?.data || error.message);
        } else if (error instanceof Error) {
            console.error('Error durante el login:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }

        return null;
    }
};

export const onLogout = () => deleteToken();
