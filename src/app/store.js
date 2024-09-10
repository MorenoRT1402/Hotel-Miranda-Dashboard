import { configureStore } from "@reduxjs/toolkit";
import { bookingSlice } from "../features/bookings/bookingSlice";

export const store = configureStore({
    reducer: {
        booking: bookingSlice.reducer,
    },
})