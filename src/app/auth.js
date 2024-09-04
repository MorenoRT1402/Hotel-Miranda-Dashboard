import bcrypt from 'bcryptjs';

const key = 'hotel-miranda-token';
const testingUser = {
    username: 'admin',
    passwordHash: bcrypt.hashSync('1234', 10)
};

export const getToken = () => JSON.parse(localStorage.getItem(key));

export const onLogin = async ({ username, password }) => {
    const isPasswordCorrect = await bcrypt.compare(password, testingUser.passwordHash);

    if (username === testingUser.username && isPasswordCorrect) {
        const token = { username, hash: testingUser.passwordHash };
        window.localStorage.setItem(key, JSON.stringify(token));
        console.log("Login successful!");
    } else {
        console.log("Invalid username or password.");
    }
};
