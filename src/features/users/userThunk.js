import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/h-miranda_concierges.json'
import { delay } from "../../app/utils";

export const getAllThunk = createAsyncThunk(
    'user/getAll',
    async () => {
        await delay();
        return data;
    }
);

export const getByIdThunk = createAsyncThunk(
    'user/getById',
    async (id) => {
        await delay();
        return data.find(user => user.id === id) || null;
    }
)

export const createThunk = createAsyncThunk(
    'user/create',
    async (user) => {
        await delay();
        alert(`Created ${JSON.stringify(user, null, 2)}`);
    }
)

export const editThunk = createAsyncThunk(
    'user/edit',
    async (id, user) => {
        await delay();
        const old = data.find(user => user.id === id) || null;
        alert(`Modified ${[...old]} -> ${[...user]}`);
    }
)

export const removeThunk = createAsyncThunk(
    'user/remove',
    async (id) => {
        await delay();
        const deleted = data.find(user => user.id === id) || null;
        alert(`Deleted ${deleted}`);
    }
)