import { createAsyncThunk } from "@reduxjs/toolkit";
import { GuestInterface } from "../../dto/guest";
import axios from "axios";
import { API_URL } from "../../app/api";
import { showToast } from "../../utils/alerts";

const BASE_URL=`${API_URL}/bookings`

export const getAllThunk = createAsyncThunk<GuestInterface[]>(
    'booking/getAll',
    async () => {
        const response = await axios.get(BASE_URL);
        return response.data;
    }
);

export const getByIdThunk = createAsyncThunk<GuestInterface | null, string>(
    'booking/getById',
    async (id: string) => {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    }
);

export const createThunk = createAsyncThunk<GuestInterface, GuestInterface>(
    'booking/create',
    async (booking: GuestInterface) => {
        const response = await axios.post(`${BASE_URL}`);
        showToast(`Created ${JSON.stringify(booking)}`);
        return response.data;
    }
);

export const editThunk = createAsyncThunk<GuestInterface, { id: string; booking: GuestInterface }>(
    'booking/edit',
    async ({ id, booking }) => {
        const response = await axios.put(`${BASE_URL}/${id}`, booking);
        return response.data;
    }
);

export const removeThunk = createAsyncThunk<string, string>(
    'booking/remove',
    async (id) => {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    }
);
