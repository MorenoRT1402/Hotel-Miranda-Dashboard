import { configureStore } from "@reduxjs/toolkit";
import { bookingSlice } from "../features/bookings/bookingSlice";
import { roomSlice } from "../features/rooms/roomsSlice";
import { userSlice } from "../features/users/userSlice";
import { PromiseStatus } from "../utils/promises";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface ReduxState {
    status: PromiseStatus,
    error : string | null
}

export const store = configureStore({
    reducer: {
        booking: bookingSlice.reducer,
        room: roomSlice.reducer,
        user: userSlice.reducer,
    },
});
