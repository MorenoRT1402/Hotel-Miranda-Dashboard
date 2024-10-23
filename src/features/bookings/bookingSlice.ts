import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import bookingThunk from './bookingThunk';
import { changeStatus, pending, PromiseStatus, rejected } from '../../utils/promises';
import { GuestInterface } from '../../dto/guest';
import { ReduxState } from '../../app/store';
import { getID } from '../../app/utils';

interface BookingState extends ReduxState {
    guests : GuestInterface[],
    guest : GuestInterface | null,
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
    reducers: {
        resetStatus: (state) => {
            state.status = PromiseStatus.IDLE;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(bookingThunk.getAll.pending, (state) => {
                pending(state);
            })
            .addCase(bookingThunk.getAll.fulfilled, (state, action) => {
                changeStatus(state, PromiseStatus.FULFILLED);
                state.guests = action.payload;
            })
            .addCase(bookingThunk.getAll.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(bookingThunk.getById.pending, state => {
                pending(state)
            })
            .addCase(bookingThunk.getById.fulfilled, (state, action) => {
                changeStatus(state, PromiseStatus.FULFILLED);
                state.guest = action.payload;
            })
            .addCase(bookingThunk.getById.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(bookingThunk.create.pending, state => {
                pending(state);
            })
            .addCase(bookingThunk.create.fulfilled, (state, action : PayloadAction<GuestInterface>) => {
                changeStatus(state, PromiseStatus.FULFILLED);
                state.guests.push(action.payload);
            })
            .addCase(bookingThunk.create.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(bookingThunk.edit.pending, (state) => {
                pending(state);
            })
            .addCase(bookingThunk.edit.fulfilled, (state, action : PayloadAction<GuestInterface>) => {
                changeStatus(state, PromiseStatus.FULFILLED);
                const index = state.guests.findIndex(booking => getID(booking) === getID(action.payload));
                if (index !== -1) {
                    state.guests[index] = action.payload;
                }
            })
            .addCase(bookingThunk.edit.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(bookingThunk.remove.pending, (state) => {
                pending(state);
            })
            .addCase(bookingThunk.remove.fulfilled, (state, action: PayloadAction<string>) => {
                changeStatus(state, PromiseStatus.FULFILLED);
                state.guests = state.guests.filter(guest => getID(guest) !== action.payload);
            })            
            .addCase(bookingThunk.remove.rejected, (state, action) => {
                rejected(state, action);
            });
    }
});

export const { resetStatus } = bookingSlice.actions;