// import data from '../../data/h-miranda_rooms.json';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../table/Table';
import { useEffect } from 'react';
import { PromiseStatus } from '../../utils/promises';
import { getAllThunk } from '../../features/rooms/roomsThunk';

export const Rooms = () => {
    const headers = ["Room Name", "Bed Type", "Room Floor", "Facilities", "Rate", "Status"];
    const { rooms, status, error } = useSelector(state => state.room);
    const dispatch = useDispatch();

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
        <>
            {/* <h1>Booking</h1>
            <p>{id!='all' ? `ID: ${id}` : "Get All" }</p> */}
            {/* <Table headers={headers} data={data}/> */}
            <Table headers={headers} data={rooms} />
        </>
    )
}