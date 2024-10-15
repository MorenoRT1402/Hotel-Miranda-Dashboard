import data from '../../data/h-miranda_rooms.json'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from '../../dto/room';
import { delay } from '../../app/utils';

const roomsData: RoomInterface[] = data as RoomInterface[];

export const getAllRoomsThunk = createAsyncThunk<RoomInterface[]>(
    'rooms/getAll',
    async () => {
        await delay();
        return roomsData;
    }
);

export const getRoomByIdThunk = createAsyncThunk<RoomInterface | null, number>(
    'rooms/getById',
    async (id: number) => {
        await delay();
        const roomConfig = roomsData.find(room => room._id === id);
        return roomConfig || null;
    }
);

export const createRoomThunk = createAsyncThunk<RoomInterface, RoomInterface>(
    'rooms/create',
    async (room: RoomInterface) => {
        await delay();
        alert(`Created ${JSON.stringify(room)}`);
        return room;
    }
);

export const editRoomThunk = createAsyncThunk<RoomInterface, { id: number; room: RoomInterface }>(
    'rooms/edit',
    async ({ id, room }) => {
        await delay();
        const oldRoomConfig = roomsData.find(r => r._id === id);

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

        const deletedConfig = roomsData.find(room => room._id === id);

        if (deletedConfig) {
            alert(`Deleted ${JSON.stringify(deletedConfig)}`);
            return id;
        } else {
            throw new Error(`Room with ID ${id} not found.`);
        }
    }
);