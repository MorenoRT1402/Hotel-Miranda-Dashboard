import React, { useEffect } from 'react';
import { getAllThunk } from '../../features/bookings/bookingThunk';
import { Table } from '../table/Table';
import { PromiseStatus } from '../../utils/promises';
import { useAppDispatch, useAppSelector } from '../../app/hooks'

export const Booking = () => {
    const dispatch = useAppDispatch();
    const { guests, status, error } = useAppSelector((state) => state.booking);
    const headers = ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", "Status"];

    useEffect(() => {
        if (status === PromiseStatus.IDLE) {
            dispatch(getAllThunk());
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