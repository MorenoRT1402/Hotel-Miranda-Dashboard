export const promiseStatus = {
    IDLE: 'idle',
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
};

export const changeStatus = (state, status) => state.status = status;
export const pending = state => changeStatus(state, promiseStatus.PENDING);
export const rejected = (state, action) => {
    changeStatus(state, promiseStatus.REJECTED);
    state.error = action.error.message;
}