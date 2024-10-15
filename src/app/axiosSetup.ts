import axios from 'axios';
import { getToken } from '../utils/persistence';

export const axiosSetup = () => {
    axios.interceptors.request.use(
        (config) => {
            const token = getToken();
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}
