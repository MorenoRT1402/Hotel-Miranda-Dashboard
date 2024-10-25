import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL, endpoints } from "../../app/api";
import { RoomInterface } from "../../dto/room";

const name = endpoints.rooms;
const endpoint = `${API_URL}/${name}`;

export const getAll = createAsyncThunk<RoomInterface[]>(
    `${name}/getAll`,
    async () => {
        const response = await axios.get(endpoint);
        return response.data;
    }
);

export const getById = createAsyncThunk<RoomInterface, string>(
    `${name}/getById`,
    async (id) => {
        const response = await axios.get(`${endpoint}/${id}`);
        return response.data;
    }
);

export const create = createAsyncThunk<RoomInterface, RoomInterface>(
    `${name}/create`,
    async (data) => {
        const response = await axios.post(endpoint, data);
        return response.data;
    }
);

export const edit = createAsyncThunk<RoomInterface, { id: string; data: RoomInterface }>(
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