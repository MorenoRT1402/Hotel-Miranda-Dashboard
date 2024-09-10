import { configureStore } from "@reduxjs/toolkit";
import { bookingSlice } from "../features/bookings/bookingSlice";
import { roomSlice } from "../features/rooms/roomsSlice";
import { userSlice } from "../features/users/userSlice";

export const store = configureStore({
    reducer: {
        booking: bookingSlice.reducer,
        room: roomSlice.reducer,
        user: userSlice.reducer
    },
})