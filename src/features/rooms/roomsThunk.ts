import data from '../../data/h-miranda_rooms.json'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomConfig } from '../../dto/room';
import { delay } from '../../app/utils';

const roomsData: RoomConfig[] = data as RoomConfig[];

export const getAllRoomsThunk = createAsyncThunk<RoomConfig[]>(
    'rooms/getAll',
    async () => {
        await delay();
        return roomsData;
    }
);

export const getRoomByIdThunk = createAsyncThunk<RoomConfig | null, number>(
    'rooms/getById',
    async (id: number) => {
        await delay();
        const roomConfig = roomsData.find(room => room.id === id);
        return roomConfig || null;
    }
);

export const createRoomThunk = createAsyncThunk<RoomConfig, RoomConfig>(
    'rooms/create',
    async (room: RoomConfig) => {
        await delay();
        alert(`Created ${JSON.stringify(room)}`);
        return room;
    }
);

export const editRoomThunk = createAsyncThunk<RoomConfig, { id: number; room: RoomConfig }>(
    'rooms/edit',
    async ({ id, room }) => {
        await delay();
        const oldRoomConfig = roomsData.find(r => r.id === id);

        if (oldRoomConfig) {
            const updatedRoom = { ...oldRoomConfig, ...room };
            alert(`Modified ${JSON.stringify(oldRoomConfig)} -> ${JSON.stringify(room)}`);

            return updatedRoom;
        } else {
            throw new Error(`Room with ID ${id} not found.`);
        }
    }
);

export const removeThunk = createAsyncThunk<number, number>(
    'rooms/remove',
    async (id) => {
        await delay();

        const deletedConfig = roomsData.find(room => room.id === id);

        if (deletedConfig) {
            alert(`Deleted ${JSON.stringify(deletedConfig)}`);
            return id;
        } else {
            throw new Error(`Room with ID ${id} not found.`);
        }
    }
);