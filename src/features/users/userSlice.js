import { createSlice } from '@reduxjs/toolkit';
import { createThunk, editThunk, getAllThunk, getByIdThunk, removeThunk } from './userThunk';
import { pending, promiseStatus, rejected } from '../../utils/promises';

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
                pending(state);
            })
            .addCase(getAllThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.users = action.payload;
            })
            .addCase(getAllThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(getByIdThunk.pending, (state) => {
                pending(state);
            })
            .addCase(getByIdThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.user = action.payload;
            })
            .addCase(getByIdThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(createThunk.pending, (state) => {
                pending(state);
            })
            .addCase(createThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                state.users.push(action.payload);
            })
            .addCase(createThunk.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(editThunk.pending, (state) => {
                pending(state);
            })
            .addCase(editThunk.fulfilled, (state, action) => {
                state.status = promiseStatus.FULFILLED;
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
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
                state.users = state.users.filter(user => user.id !== action.payload.id);
            })
            .addCase(removeThunk.rejected, (state, action) => {
                rejected(state, action);
            });
    }
});