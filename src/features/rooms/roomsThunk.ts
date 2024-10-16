import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from '../../dto/room';
import axios from 'axios';
import { API_URL } from '../../app/api';

const BASE_URL=`${API_URL}/bookings`

export const getAllRoomsThunk = createAsyncThunk<RoomInterface[]>(
    'rooms/getAll',
    async () => {
        const response = await axios.get(BASE_URL);
        return response.data;
    }
);

export const getRoomByIdThunk = createAsyncThunk<RoomInterface | null, string>(
    'rooms/getById',
    async (id:string) => {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    }
);

export const createRoomThunk = createAsyncThunk<RoomInterface, RoomInterface>(
    'rooms/create',
    async (room: RoomInterface) => {
        const response = await axios.post(`${BASE_URL}`);
        alert(`Created ${JSON.stringify(room)}`);
        return response.data;
    }
);

export const editRoomThunk = createAsyncThunk<RoomInterface, { id: number; room: RoomInterface }>(
    'rooms/edit',
    async ({ id, room }) => {
        const response = await axios.put(`${BASE_URL}/${id}`, room);
        return response.data;
    }
);

export const removeThunk = createAsyncThunk<string, string>(
    'rooms/remove',
    async (id) => {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    }
);