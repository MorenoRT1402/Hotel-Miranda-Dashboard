import bcrypt from 'bcryptjs';
import { testingUser } from './auth.credentials';

const key = 'hotel-miranda-token';

export const getToken = (): any => JSON.parse(localStorage.getItem(key) ?? 'null');

interface LoginParams {
    username?: string;
    email?: string;
    password: string;
}

const saveToken = async (firstCondition: boolean, password: string): Promise<boolean> => {
    try {
        const pswdCorrect = await bcrypt.compare(password, testingUser.passwordHash);
        if (firstCondition && pswdCorrect) {
            window.localStorage.setItem(key, JSON.stringify(testingUser));
            console.log("Login successful!");
            return true;
        } else {
            console.log("Invalid credentials.");
            return false;
        }
    } catch (error) {
        console.error("Error while verifying password:", error);
        return false;
    }
};

export const onLogin = async ({ username, password }: LoginParams): Promise<boolean> => {
    return saveToken(username === testingUser.username, password);
};

export const onLoginWithEmail = async ({ email, password }: LoginParams): Promise<boolean> => {
    return saveToken(email === testingUser.email, password);
};

export const onLogout = (): void => localStorage.removeItem(key);
