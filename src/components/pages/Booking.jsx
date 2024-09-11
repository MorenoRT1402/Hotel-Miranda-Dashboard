// import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
// import data from '../../data/h-miranda_guests.json'
import { useEffect } from 'react';
import { getAllThunk } from '../../features/bookings/bookingThunk';
import { Table } from '../table/Table';
import { promiseStatus } from '../../utils/promises';

export const Booking = () => {
    const dispatch = useDispatch();
    const { guests, status, error } = useSelector((state) => state.booking);
    // const { id } = useParams();
    const headers = ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", "Status"];

    useEffect(() => {
        if (status === promiseStatus.IDLE) {
            dispatch(getAllThunk());
        }
    }, [dispatch, status]);

    if (status === promiseStatus.PENDING) {
        return <p>Loading...</p>;
    }

    if (status === promiseStatus.REJECTED) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            {/* <h1>Booking</h1>
            <p>{id!='all' ? `ID: ${id}` : "Get All" }</p> */}
            <Table headers={headers} data={guests}/>
        </>
    )
}