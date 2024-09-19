import { createSlice } from '@reduxjs/toolkit';
import { createThunk, editThunk, getAllThunk, getByIdThunk, removeThunk } from './bookingThunk';
import { changeStatus, pending, promiseStatus, rejected } from '../../utils/promises';

const initialState = {
    guests: [],
    guest: null,
    status: promiseStatus.IDLE,
    error: null
};

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllThunk.pending, (state) => {
                pending(state);
            })
            .addCase(getAllThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.guests = action.payload;
            })
            .addCase(getAllThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(getByIdThunk.pending, state => {
                pending(state)
            })
            .addCase(getByIdThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.guest = action.payload;
            })
            .addCase(getByIdThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(createThunk.pending, state => {
                pending(state);
            })
            .addCase(createThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.guests.push(action.payload);
                // state.guests = [...state.guests, action.payload];
            })
            .addCase(createThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(editThunk.pending, (state) => {
                pending(state);
            })
            .addCase(editThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                const index = state.guests.findIndex(booking => booking.id === action.payload.id);
                if (index !== -1) {
                    state.guests[index] = action.payload;
                }
            })
            .addCase(editThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(removeThunk.pending, (state) => {
                pending(state);
            })
            .addCase(removeThunk.fulfilled, (state, action) => {
                changeStatus(state, promiseStatus.FULFILLED);
                state.guests = state.guests.filter(booking => booking.id !== action.payload.id);
            })
            .addCase(removeThunk.rejected, (state, action) => {
                rejected(state, action);
            });
    }
});