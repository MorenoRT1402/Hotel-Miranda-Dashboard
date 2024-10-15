import { createSlice } from '@reduxjs/toolkit';
import { pending, PromiseStatus, rejected } from '../../utils/promises';
import { createRoomThunk, editRoomThunk, getAllRoomsThunk, getRoomByIdThunk, removeThunk } from './roomsThunk';
import { ReduxState } from '../../app/store';
import { RoomInterface } from '../../dto/room';

interface RoomState extends ReduxState {
    rooms: RoomInterface[];
    room: RoomInterface | null;
}

const initialState : RoomState = {
    rooms: [],
    room: null,
    status: PromiseStatus.IDLE,
    error: null
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllRoomsThunk.pending, state => {
                pending(state);
            })
            .addCase(getAllRoomsThunk.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                state.rooms = action.payload;
            })
            .addCase(getAllRoomsThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(getRoomByIdThunk.pending, (state) => {
                pending(state);
            })
            .addCase(getRoomByIdThunk.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                state.room = action.payload;
            })
            .addCase(getRoomByIdThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(createRoomThunk.pending, (state) => {
                pending(state);
            })
            .addCase(createRoomThunk.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                state.rooms.push(action.payload);
            })
            .addCase(createRoomThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(editRoomThunk.pending, (state) => {
                pending(state);
            })
            .addCase(editRoomThunk.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                const index = state.rooms.findIndex(room => room._id === action.payload._id);
                if (index !== -1) {
                    state.rooms[index] = action.payload;
                }
            })
            .addCase(editRoomThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(removeThunk.pending, (state) => {
                pending(state);
            })
            .addCase(removeThunk.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                state.rooms = state.rooms.filter(room => room._id !== action.payload);
            })
            .addCase(removeThunk.rejected, (state, action) => {
                rejected(state, action);
            });
    }
});