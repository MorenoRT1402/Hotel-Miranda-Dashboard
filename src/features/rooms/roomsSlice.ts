import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pending, PromiseStatus, rejected } from '../../utils/promises';
import roomThunk from './roomsThunk';
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
    reducers: {
        resetStatus: (state) => {
            state.status = PromiseStatus.IDLE;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(roomThunk.getAll.pending, state => {
                pending(state);
            })
            .addCase(roomThunk.getAll.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                state.rooms = action.payload;
            })
            .addCase(roomThunk.getAll.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(roomThunk.getById.pending, (state) => {
                pending(state);
            })
            .addCase(roomThunk.getById.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                state.room = action.payload;
            })
            .addCase(roomThunk.getById.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(roomThunk.create.pending, (state) => {
                pending(state);
            })
            .addCase(roomThunk.create.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                state.rooms.push(action.payload);
            })
            .addCase(roomThunk.create.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(roomThunk.edit.pending, (state) => {
                pending(state);
            })
            .addCase(roomThunk.edit.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                const index = state.rooms.findIndex(room => room._id === action.payload._id);
                if (index !== -1) {
                    state.rooms[index] = action.payload;
                }
            })
            .addCase(roomThunk.edit.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(roomThunk.remove.pending, (state) => {
                pending(state);
            })
            .addCase(roomThunk.remove.fulfilled, (state, action:PayloadAction<string>) => {
                state.status = PromiseStatus.FULFILLED;
                state.rooms = state.rooms.filter(room => room._id !== action.payload);
            })
            .addCase(roomThunk.remove.rejected, (state, action) => {
                rejected(state, action);
            });
    }
});

export const { resetStatus } = roomSlice.actions;