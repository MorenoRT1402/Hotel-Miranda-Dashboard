import { createSlice } from '@reduxjs/toolkit';
import { createThunk, editThunk, getAllThunk, getByIdThunk, removeThunk } from './roomsThunk';
import { pending, promiseStatus, rejected } from '../../utils/promises';

const initialState = {
    rooms: [],
    room: null,
    status: promiseStatus.IDLE,
    error: null
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllThunk.pending, state => {
                pending(state);
            })
            .addCase(getAllThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.rooms = action.payload;
            })
            .addCase(getAllThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(getByIdThunk.pending, (state) => {
                pending(state);
            })
            .addCase(getByIdThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.room = action.payload;
            })
            .addCase(getByIdThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(createThunk.pending, (state) => {
                pending(state);
            })
            .addCase(createThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.rooms.push(action.payload);
            })
            .addCase(createThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(editThunk.pending, (state) => {
                pending(state);
            })
            .addCase(editThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                const index = state.rooms.findIndex(room => room.id === action.payload.id);
                if (index !== -1) {
                    state.rooms[index] = action.payload;
                }
            })
            .addCase(editThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(removeThunk.pending, (state) => {
                pending(state);
            })
            .addCase(removeThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.rooms = state.rooms.filter(room => room.id !== action.payload.id);
            })
            .addCase(removeThunk.rejected, (state, action) => {
                rejected(state, action);
            });
    }
});