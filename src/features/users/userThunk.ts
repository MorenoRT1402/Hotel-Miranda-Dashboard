import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/h-miranda_concierges.json';
import { delay } from "../../app/utils";
import { User, UserConfig } from "../../dto/user";

const usersData: UserConfig[] = data as UserConfig[];

export const getAllThunk = createAsyncThunk<User[]>(
    'user/getAll',
    async () => {
        await delay();
        return usersData.map(userConfig => new User(userConfig));
    }
);

export const getByIdThunk = createAsyncThunk<User | null, number>(
    'user/getById',
    async (id) => {
        await delay();
        const userConfig = usersData.find(room => room.id === id);
        return userConfig ? new User(userConfig) : null;
    }
);

export const createThunk = createAsyncThunk<User, UserConfig>(
    'user/create',
    async (user) => {
        await delay();
        alert(`Created ${JSON.stringify(user, null, 2)}`);
        return new User(user);
    }
);

export const editThunk = createAsyncThunk<User, { id: number; user: User }>(
    'user/edit',
    async ({ id, user }) => {
        await delay();
        const oldConfig = usersData.find(r => r.id === id);

        if (oldConfig) {
            const updatedUser = { ...oldConfig, ...user };
            alert(`Modified ${new User(oldConfig).toString()} -> ${user.toString()}`);

            return new User(updatedUser);
        } else {
            throw new Error(`Room with ID ${id} not found.`);
        }
    }
);

export const removeThunk = createAsyncThunk<number, number>(
    'user/remove',
    async (id) => {
        await delay();
        const deletedConfig = usersData.find(user => user.id === id) || null;
        if (deletedConfig) {
            const deleted = new User(deletedConfig);
            alert(`Deleted ${deleted.toString()}`);
            return id;
        } else {
            throw new Error(`User with ID ${id} not found.`);
        }
    }
);
