import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { GuestInterface } from "../../dto/guest";
import { API_URL, endpoints } from "../../app/api";

const name = endpoints.booking;
const endpoint = `${API_URL}/${name}`;

const getAll = createAsyncThunk<GuestInterface[]>(
    `${name}/getAll`,
    async () => {
        const response = await axios.get(endpoint);
        return response.data;
    }
);

export const getById = createAsyncThunk<GuestInterface, string>(
    `${name}/getById`,
    async (id) => {
        const response = await axios.get(`${endpoint}/${id}`);
        return response.data;
    }
);

export const create = createAsyncThunk<GuestInterface, GuestInterface>(
    `${name}/create`,
    async (bookingData) => {
        const response = await axios.post(endpoint, bookingData);
        return response.data;
    }
);

export const edit = createAsyncThunk<GuestInterface, { id: string; bookingData: GuestInterface }>(
    `${name}/edit`,
    async ({ id, bookingData }) => {
        const response = await axios.put(`${endpoint}/${id}`, bookingData);
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