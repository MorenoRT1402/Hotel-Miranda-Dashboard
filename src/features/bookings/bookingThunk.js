import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/h-miranda_guests.json'
import { delay } from "../../app/utils";

export const getAllThunk = createAsyncThunk(
    'booking/getAll',
    async () => {
        await delay();
        return data;
    }
);

export const getByIdThunk = createAsyncThunk(
    'booking/getById',
    async (id) => {
        await delay();
        return data.find(booking => booking.id === id) || null;
    }
)

export const createThunk = createAsyncThunk(
    'booking/create',
    async (booking) => {
        await delay();
        alert(`Created ${booking}`);
        return booking;
    }
)

export const editThunk = createAsyncThunk(
    'booking/edit',
    async (id, booking) => {
        await delay();
        const old = data.find(booking => booking.id === id) || null;
        alert(`Modified ${[...old]} -> ${[...booking]}`);
    }
)

export const removeThunk = createAsyncThunk(
    'booking/remove',
    async (id) => {
        await delay();
        const deleted = data.find(booking => booking.id === id) || null;
        alert(`Deleted ${deleted}`);
    }
)