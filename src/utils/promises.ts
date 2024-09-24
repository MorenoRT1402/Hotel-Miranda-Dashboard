import { ReduxState } from "../app/store";

export enum PromiseStatus {
    IDLE, PENDING, FULFILLED, REJECTED
}

export const changeStatus = (state: ReduxState, status : PromiseStatus) => state.status = status;
export const pending = (state : ReduxState) => changeStatus(state, PromiseStatus.PENDING);
export const rejected = (state: ReduxState, action: { error: { message?: string } }) => {
    changeStatus(state, PromiseStatus.REJECTED);
    state.error = action.error.message ?? "An unknown error occurred";
};