import React from 'react';
import { useAppSelector } from '../../app/hooks'
import { commonHeaders } from '../../app/table';
import { DataPage } from './DataPage';
import { resetStatus } from '../../features/bookings/bookingSlice';
import bookingThunk from '../../features/bookings/bookingThunk';

export const Booking = () => {
    const selector = useAppSelector((state) => state.booking);
    const headers = ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", ...commonHeaders];

    return (
        <DataPage 
        thunk={bookingThunk}
        selector={selector}
        dataKey={'guests'}
        headers={headers}
        resetStatusAction={resetStatus}
        />
    )
}