import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../dto/user";
import axios from "axios";
import { API_URL } from "../../app/api";
import { showToast } from "../../utils/alerts";

const BASE_URL=`${API_URL}/bookings`

export const getAllThunk = createAsyncThunk<UserInterface[]>(
    'user/getAll',
    async () => {
        const response = await axios.get(BASE_URL);
        return response.data;
    }
);

export const getByIdThunk = createAsyncThunk<UserInterface | null, string>(
    'user/getById',
    async (id:string) => {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    }
);

export const createThunk = createAsyncThunk<UserInterface, UserInterface>(
    'user/create',
    async (user) => {
        const response = await axios.post(`${BASE_URL}`);
        showToast(`Created ${JSON.stringify(user)}`);
        return response.data;
    }
);

export const editThunk = createAsyncThunk<UserInterface, { id: number; user: UserInterface }>(
    'user/edit',
    async ({ id, user }) => {
        const response = await axios.put(`${BASE_URL}/${id}`, user);
        return response.data;
    }
);

export const removeThunk = createAsyncThunk<number, number>(
    'user/remove',
    async (id) => {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    }
);
