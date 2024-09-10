import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/h-miranda_rooms.json'
import { delay } from "../../app/utils";

export const getAllThunk = createAsyncThunk(
    'room/getAll',
    async () => {
        await delay(5000);
        return data;
    }
);

export const getByIdThunk = createAsyncThunk(
    'room/getById',
    async (id) => {
        await delay(5000);
        return data.find(room => room.id === id) || null;
    }
)

export const createThunk = createAsyncThunk(
    'room/create',
    async (room) => {
        await delay(5000);
        alert(`Created ${room}`);
    }
)

export const editThunk = createAsyncThunk(
    'room/edit',
    async (id, room) => {
        await delay(5000);
        const old = data.find(room => room.id === id) || null;
        alert(`Modified ${[...old]} -> ${[...room]}`);
    }
)

export const removeThunk = createAsyncThunk(
    'room/remove',
    async (id) => {
        await delay(5000);
        const deleted = data.find(room => room.id === id) || null;
        alert(`Deleted ${deleted}`);
    }
)