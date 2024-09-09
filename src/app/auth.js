import bcrypt from 'bcryptjs';
import { testingUser } from './auth.credentials';

const key = 'hotel-miranda-token';

export const getToken = () => JSON.parse(localStorage.getItem(key));

const saveToken = async (firstCondition, password) => {
    try {
        const pswdCorrect = await bcrypt.compare(password, testingUser.passwordHash);
        if (firstCondition && pswdCorrect) {
            window.localStorage.setItem(key, JSON.stringify(testingUser));
            console.log("Login successful!");
            
            return true;
        } else {
            console.log("Invalid credentials.");
        }
    } catch (error) {
        console.error("Error while verifying password:", error);
    }
};

export const onLogin = async ({ username, password }) => saveToken(username === testingUser.username, password);

export const onLoginWithEmail = async ({ email, password }) => saveToken(email === testingUser.email, password);

export const onLogout = () => localStorage.removeItem(key);
