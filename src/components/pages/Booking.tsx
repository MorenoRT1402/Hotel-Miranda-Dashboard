import React, { useEffect } from 'react';
import { Table } from '../table/Table';
import { PromiseStatus } from '../../utils/promises';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import bookingThunk from '../../features/bookings/bookingThunk';
import { commonHeaders } from '../../app/table';

export const Booking = () => {
    const dispatch = useAppDispatch();
    const { guests, status, error } = useAppSelector((state) => state.booking);
    const headers = ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", ...commonHeaders];

    useEffect(() => {
        if (status === PromiseStatus.IDLE) {
            dispatch(bookingThunk.getAll());
        }
    }, [dispatch, status]);

    if (status === PromiseStatus.PENDING) {
        return <p>Loading...</p>;
    }

    if (status === PromiseStatus.REJECTED) {
        return <p>Error: {error}</p>;
    }

    return (
        <Table headers={headers} data={guests}/>
    )
}