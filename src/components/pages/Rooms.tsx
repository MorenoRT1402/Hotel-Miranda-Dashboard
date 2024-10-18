import { Table } from '../table/Table';
import React, { useEffect } from 'react';
import { PromiseStatus } from '../../utils/promises';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import roomThunk from '../../features/rooms/roomsThunk';
import { commonHeaders } from '../../app/table';

export const Rooms = () => {
    const dispatch = useAppDispatch();
    const { rooms, status, error } = useAppSelector(state => state.room);
    const headers = ["Room Name", "Bed Type", "Room Floor", "Facilities", "Rate", ...commonHeaders];

    useEffect(() => {
        if (status === PromiseStatus.IDLE) {
            dispatch(roomThunk.getAll());
        }
    }, [dispatch, status]);

    if (status === PromiseStatus.PENDING) {
        return <p>Loading...</p>;
    }

    if (status === PromiseStatus.REJECTED) {
        return <p>Error: {error}</p>;
    }

    return (
        <Table headers={headers} data={rooms} />
    )
}