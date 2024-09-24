import data from '../../data/h-miranda_rooms.json'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Room, RoomConfig } from '../../dto/room';
import { delay } from '../../app/utils';

const roomsData: RoomConfig[] = data as RoomConfig[];

export const getAllRoomsThunk = createAsyncThunk<Room[]>(
    'rooms/getAll',
    async () => {
        await delay();
        return roomsData.map(roomConfig => new Room(roomConfig));
    }
);

export const getRoomByIdThunk = createAsyncThunk<Room | null, number>(
    'rooms/getById',
    async (id: number) => {
        await delay();
        const roomConfig = roomsData.find(room => room.id === id);
        return roomConfig ? new Room(roomConfig) : null;
    }
);

export const createRoomThunk = createAsyncThunk<Room, Room>(
    'rooms/create',
    async (room: Room) => {
        await delay();
        alert(`Created ${room.toString()}`);
        return room;
    }
);

export const editRoomThunk = createAsyncThunk<Room, { id: number; room: Room }>(
    'rooms/edit',
    async ({ id, room }) => {
        await delay();
        const oldRoomConfig = roomsData.find(r => r.id === id);

        if (oldRoomConfig) {
            const updatedRoom = { ...oldRoomConfig, ...room };
            alert(`Modified ${new Room(oldRoomConfig).toString()} -> ${room.toString()}`);

            return new Room(updatedRoom);
        } else {
            throw new Error(`Room with ID ${id} not found.`);
        }
    }
);

export const removeThunk = createAsyncThunk<number, number>(
    'rooms/remove',
    async (id) => {
        await delay();

        const deletedConfig = roomsData.find(booking => booking.id === id);

        if (deletedConfig) {
            const deleted = new Room(deletedConfig);
            alert(`Deleted ${deleted.toString()}`);
            return id;
        } else {
            throw new Error(`Room with ID ${id} not found.`);
        }
    }
);