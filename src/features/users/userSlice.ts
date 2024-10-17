import { createSlice } from '@reduxjs/toolkit';
import userThunk from './userThunk';
import { pending, PromiseStatus, rejected } from '../../utils/promises';
import { ReduxState } from '../../app/store';
import { UserInterface } from '../../dto/user';

interface UserState extends ReduxState {
    users: UserInterface[];
    user: UserInterface | null;
}

const initialState : UserState = {
    users: [],
    user: null,
    status: PromiseStatus.IDLE,
    error: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userThunk.getAll.pending, (state) => {
                pending(state);
            })
            .addCase(userThunk.getAll.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                state.users = action.payload;
            })
            .addCase(userThunk.getAll.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(userThunk.getById.pending, (state) => {
                pending(state);
            })
            .addCase(userThunk.getById.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                state.user = action.payload;
            })
            .addCase(userThunk.getById.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(userThunk.create.pending, (state) => {
                pending(state);
            })
            .addCase(userThunk.create.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                state.users.push(action.payload);
            })
            .addCase(userThunk.create.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(userThunk.edit.pending, (state) => {
                pending(state);
            })
            .addCase(userThunk.edit.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(userThunk.edit.rejected, (state, action) => {
                rejected(state, action);
            })

            .addCase(userThunk.remove.pending, (state) => {
                pending(state);
            })
            .addCase(userThunk.remove.fulfilled, (state, action) => {
                state.status = PromiseStatus.FULFILLED;
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            .addCase(userThunk.remove.rejected, (state, action) => {
                rejected(state, action);
            });
    }
});