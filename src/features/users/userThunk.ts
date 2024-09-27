import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/h-miranda_concierges.json';
import { delay } from "../../app/utils";
import { UserInterface } from "../../dto/user";

const usersData: UserInterface[] = data as UserInterface[];

export const getAllThunk = createAsyncThunk<UserInterface[]>(
    'user/getAll',
    async () => {
        await delay();
        return usersData;
    }
);

export const getByIdThunk = createAsyncThunk<UserInterface | null, number>(
    'user/getById',
    async (id) => {
        await delay();
        const userConfig = usersData.find(room => room.id === id);
        return userConfig || null;
    }
);

export const createThunk = createAsyncThunk<UserInterface, UserInterface>(
    'user/create',
    async (user) => {
        await delay();
        alert(`Created ${JSON.stringify(user, null, 2)}`);
        return user;
    }
);

export const editThunk = createAsyncThunk<UserInterface, { id: number; user: UserInterface }>(
    'user/edit',
    async ({ id, user }) => {
        await delay();
        const oldConfig = usersData.find(r => r.id === id);

        if (oldConfig) {
            const updatedUser = { ...oldConfig, ...user };
            alert(`Modified ${JSON.stringify(oldConfig)} -> ${JSON.stringify(user)}`);

            return updatedUser;
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
            alert(`Deleted ${JSON.stringify(deletedConfig)}`);
            return id;
        } else {
            throw new Error(`User with ID ${id} not found.`);
        }
    }
);
