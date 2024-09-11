import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/h-miranda_guests.json'
import { delay } from "../../app/utils";

export const getAllThunk = createAsyncThunk(
    'booking/getAll',
    async () => {
        await delay(5000);
        return data;
    }
);

export const getByIdThunk = createAsyncThunk(
    'booking/getById',
    async (id) => {
        await delay(5000);
        return data.find(booking => booking.id === id) || null;
    }
)

export const createThunk = createAsyncThunk(
    'booking/create',
    async (booking) => {
        await delay(5000);
        alert(`Created ${booking}`);
        return booking;
    }
)

export const editThunk = createAsyncThunk(
    'booking/edit',
    async (id, booking) => {
        await delay(5000);
        const old = data.find(booking => booking.id === id) || null;
        alert(`Modified ${[...old]} -> ${[...booking]}`);
    }
)

export const removeThunk = createAsyncThunk(
    'booking/remove',
    async (id) => {
        await delay(5000);
        const deleted = data.find(booking => booking.id === id) || null;
        alert(`Deleted ${deleted}`);
    }
)