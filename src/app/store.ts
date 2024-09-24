import { configureStore } from "@reduxjs/toolkit";
import { bookingSlice } from "../features/bookings/bookingSlice";
import { roomSlice } from "../features/rooms/roomsSlice";
import { userSlice } from "../features/users/userSlice";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: {
        booking: bookingSlice.reducer,
        room: roomSlice.reducer,
        user: userSlice.reducer,
    },
});
