import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createThunk, editThunk, getAllThunk, getByIdThunk, removeThunk } from './bookingThunk';
import { changeStatus, pending, PromiseStatus, rejected } from '../../utils/promises';
import { Guest } from '../../dto/guest';
import { ReduxState } from '../../app/store';

interface BookingState extends ReduxState {
    guests : Guest[],
    guest : Guest | null,
}

const initialState : BookingState = {
    guests: [],
    guest: null,
    status: PromiseStatus.IDLE,
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
                changeStatus(state, PromiseStatus.FULFILLED);
                state.guests = action.payload;
            })
            .addCase(getAllThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(getByIdThunk.pending, state => {
                pending(state)
            })
            .addCase(getByIdThunk.fulfilled, (state, action) => {
                changeStatus(state, PromiseStatus.FULFILLED);
                state.guest = action.payload;
            })
            .addCase(getByIdThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(createThunk.pending, state => {
                pending(state);
            })
            .addCase(createThunk.fulfilled, (state, action : PayloadAction<Guest>) => {
                changeStatus(state, PromiseStatus.FULFILLED);
                state.guests.push(action.payload);
            })
            .addCase(createThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(editThunk.pending, (state) => {
                pending(state);
            })
            .addCase(editThunk.fulfilled, (state, action : PayloadAction<Guest>) => {
                changeStatus(state, PromiseStatus.FULFILLED);
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
            .addCase(removeThunk.fulfilled, (state, action: PayloadAction<number>) => {
                changeStatus(state, PromiseStatus.FULFILLED);
                state.guests = state.guests.filter(guest => guest.id !== action.payload);
            })            
            .addCase(removeThunk.rejected, (state, action) => {
                rejected(state, action);
            });
    }
});