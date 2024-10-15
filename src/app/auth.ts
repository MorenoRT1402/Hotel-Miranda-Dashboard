import axios from 'axios';
import { API_URL } from './api';
import { deleteToken, saveToken } from '../utils/persistence';

interface LoginParams {
    username?: string;
    email?: string;
    password: string;
}

export const onLogin = async (data: LoginParams): Promise<boolean> => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, data);

        if (res.data?.token) {
            saveToken(res.data.token);
            return true;
        }
        return false;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error de autenticación:', error.response?.data || error.message);
        } else if (error instanceof Error) {
            console.error('Error durante el login:', error.message);
        } else {
            console.error('Error desconocido:', error);
        }

        return false;
    }
};

export const onLogout = () => deleteToken();
