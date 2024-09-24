import bcrypt from 'bcryptjs';

export const validPass = '1234';
export const testingUser = {
    username: 'admin',
    email: 'admin@gmail.com',
    passwordHash: bcrypt.hashSync(validPass, 10)
};
