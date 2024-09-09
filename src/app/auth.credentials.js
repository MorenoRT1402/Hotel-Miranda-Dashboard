import bcrypt from 'bcryptjs';

export const testingUser = {
    username: 'admin',
    email: 'admin@gmail.com',
    passwordHash: bcrypt.hashSync('1234', 10)
};