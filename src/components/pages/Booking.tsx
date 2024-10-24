import React from 'react';
import { useAppSelector } from '../../app/hooks'
import bookingThunk from '../../features/bookings/bookingThunk';
import { commonHeaders } from '../../app/table';
import { resetStatus } from '../../features/bookings/bookingSlice';
import { DataPage } from './DataPage';

export const Booking = () => {
    const selector = useAppSelector((state) => state.booking);
    const headers = ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", ...commonHeaders];

    return (
        <DataPage 
        thunkAction={bookingThunk.getAll}
        resetStatusAction={resetStatus}
        selector={selector}
        dataKey={'guests'}
        headers={headers}
        />
    )
}