import { createSlice } from '@reduxjs/toolkit';
import { promiseStatus } from '../../app/actions';
import { createThunk, editThunk, getAllThunk, getByIdThunk, removeThunk } from './userThunk';

const initialState = {
    users: [],
    user: null,
    status: promiseStatus.IDLE,
    error: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllThunk.pending, (state) => {
                state.status = promiseStatus.PENDING;
            })
            .addCase(getAllThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.users = action.payload;
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
                state.user = action.payload;
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
                state.users.push(action.payload);
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
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
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
                state.users = state.users.filter(user => user.id !== action.payload.id);
            })
            .addCase(removeThunk.rejected, (state, action) => {
                state.status = promiseStatus.REJECTED;
                state.error = action.error.message;
            });
    }
});