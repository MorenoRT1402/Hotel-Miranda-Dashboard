export enum PromiseStatus {
    IDLE, PENDING, FULFILLED, REJECTED
}

export const changeStatus = (state, status : PromiseStatus) => state.status = status;
export const pending = state => changeStatus(state, PromiseStatus.PENDING);
export const rejected = (state, action) => {
    changeStatus(state, PromiseStatus.REJECTED);
    state.error = action.error.message;
}