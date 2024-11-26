import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL, endpoints } from "../../app/api";
import { UserInterface } from "../../dto/user";

const name = endpoints.users;
const endpoint = `${API_URL}/${name}`;

export const getAll = createAsyncThunk<UserInterface[]>(
    `${name}/getAll`,
    async () => {
        const response = await axios.get(endpoint);
        return response.data;
    }
);

export const getById = createAsyncThunk<UserInterface, string>(
    `${name}/getById`,
    async (id) => {
        const response = await axios.get(`${endpoint}/${id}`);
        return response.data;
    }
);

export const createUnsafe = createAsyncThunk<UserInterface, UserInterface>(
    `${name}/createUnsafe`,
    async (data) => {
        const response = await axios.post(endpoint, data);
        return response.data;
    }
);

export const create = createAsyncThunk<UserInterface, UserInterface>(
    `${name}/create`,
    async (data) => {
        const url = `${API_URL}/${endpoints.register}`
        const response = await axios.post(url, data);
        return response.data;
    }
);

export const edit = createAsyncThunk<UserInterface, { id: string; data: UserInterface }>(
    `${name}/edit`,
    async ({ id, data }) => {
        const response = await axios.put(`${endpoint}/${id}`, data);
        return response.data;
    }
);

export const remove = createAsyncThunk<string, string>(
    `${name}/remove`,
    async (id) => {
        await axios.delete(`${endpoint}/${id}`);
        return id;
    }
);

export default { getAll, getById, create, edit, remove }