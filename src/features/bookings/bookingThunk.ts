import { createAsyncThunk } from "@reduxjs/toolkit";
import data from '../../data/h-miranda_guests.json';
import { Guest, GuestConfig } from "../../dto/guest";
import { delay } from "../../app/utils";

const guestsData: GuestConfig[] = data as GuestConfig[]; 

export const getAllThunk = createAsyncThunk<Guest[]>(
    'booking/getAll',
    async () => {
        await delay();
        return guestsData.map(guestConfig => new Guest(guestConfig));
    }
);

export const getByIdThunk = createAsyncThunk<Guest | null, number>(
    'booking/getById',
    async (id: number) => {
        await delay();
        const guestConfig = guestsData.find(booking => booking.id === id) || null;
        return guestConfig ? new Guest(guestConfig) : null;
    }
);

export const createThunk = createAsyncThunk<Guest, Guest>(
    'booking/create',
    async (booking: Guest) => {
        await delay();
        alert(`Created ${booking.toString()}`);
        return booking;
    }
);

export const editThunk = createAsyncThunk<Guest, { id: number; booking: Guest }>(
    'booking/edit',
    async ({ id, booking }) => {
        await delay();

        const oldConfig = guestsData.find(b => b.id === id);

        if (oldConfig) {
            const old = new Guest(oldConfig);
            alert(`Modified ${old.toString()} -> ${booking.toString()}`);

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
            const deleted = new Guest(deletedConfig);
            alert(`Deleted ${deleted.toString()}`);
            return id;
        } else {
            throw new Error(`Guest with ID ${id} not found.`);
        }
    }
);
