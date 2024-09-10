import { createSlice } from '@reduxjs/toolkit';
import { promiseStatus } from '../../app/actions';
import { createThunk, editThunk, getAllThunk, getByIdThunk, removeThunk } from './bookingThunk';

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
                state.status = promiseStatus.PENDING;
            })
            .addCase(getAllThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.guests = action.payload;
            })
            .addCase(getAllThunk.rejected, (state, action) => {
                state.status = promiseStatus.REJECTED;
                state.error = action.error.message;
            })

            .addCase(getByIdThunk.pending, (state) => {
                state.status = promiseStatus.PENDING;
            })
            .addCase(getByIdThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.guest = action.payload;
            })
            .addCase(getByIdThunk.rejected, (state, action) => {
                state.status = promiseStatus.REJECTED;
                state.error = action.error.message;
            })

            .addCase(createThunk.pending, (state) => {
                state.status = promiseStatus.PENDING;
            })
            .addCase(createThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.guests.push(action.payload);
            })
            .addCase(createThunk.rejected, (state, action) => {
                state.status = promiseStatus.REJECTED;
                state.error = action.error.message;
            })

            .addCase(editThunk.pending, (state) => {
                state.status = promiseStatus.PENDING;
            })
            .addCase(editThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                const index = state.guests.findIndex(booking => booking.id === action.payload.id);
                if (index !== -1) {
                    state.guests[index] = action.payload;
                }
            })
            .addCase(editThunk.rejected, (state, action) => {
                state.status = promiseStatus.REJECTED;
                state.error = action.error.message;
            })

            .addCase(removeThunk.pending, (state) => {
                state.status = promiseStatus.PENDING;
            })
            .addCase(removeThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.guests = state.guests.filter(booking => booking.id !== action.payload.id);
            })
            .addCase(removeThunk.rejected, (state, action) => {
                state.status = promiseStatus.REJECTED;
                state.error = action.error.message;
            });
    }
});