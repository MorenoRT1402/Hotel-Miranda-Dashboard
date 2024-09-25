import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/h-miranda_guests.json';
import { GuestConfig } from "../../dto/guest";
import { delay } from "../../app/utils";

const guestsData: GuestConfig[] = data as GuestConfig[]; 

export const getAllThunk = createAsyncThunk<GuestConfig[]>(
    'booking/getAll',
    async () => {
        await delay();
        return guestsData;
    }
);

export const getByIdThunk = createAsyncThunk<GuestConfig | null, number>(
    'booking/getById',
    async (id: number) => {
        await delay();
        const guestConfig = guestsData.find(booking => booking.id === id) || null;
        return guestConfig || null;
    }
);

export const createThunk = createAsyncThunk<GuestConfig, GuestConfig>(
    'booking/create',
    async (booking: GuestConfig) => {
        await delay();
        alert(`Created ${JSON.stringify(booking)}`);
        return booking;
    }
);

export const editThunk = createAsyncThunk<GuestConfig, { id: number; booking: GuestConfig }>(
    'booking/edit',
    async ({ id, booking }) => {
        await delay();

        const oldConfig = guestsData.find(b => b.id === id);

        if (oldConfig) {
            alert(`Modified ${JSON.stringify(oldConfig)} -> ${JSON.stringify(booking)}`);

            return booking;
        } else {
            throw new Error(`Guest with ID ${id} not found.`);
        }
    }
);

export const removeThunk = createAsyncThunk<number, number>(
    'booking/remove',
    async (id) => {
        await delay();

        const deletedConfig = guestsData.find(booking => booking.id === id);

        if (deletedConfig) {
            alert(`Deleted ${JSON.stringify(deletedConfig)}`);
            return id;
        } else {
            throw new Error(`Guest with ID ${id} not found.`);
        }
    }
);
