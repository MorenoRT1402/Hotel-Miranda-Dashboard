// Rooms.jsx
import React from 'react';
import { commonHeaders } from '../../app/table';
import roomThunk from '../../features/rooms/roomsThunk';
import { resetStatus } from '../../features/rooms/roomsSlice';
import { DataPage } from './DataPage';
import { useAppSelector } from '../../app/hooks';

export const Rooms = () => {
    const selector = useAppSelector((state) => state.room);
    const headers = ["Room Name", "Bed Type", "Room Floor", "Facilities", "Rate", ...commonHeaders];

    return (
        <DataPage
            thunkAction={roomThunk.getAll}
            resetStatusAction={resetStatus}
            selector={selector}
            dataKey={'rooms'}
            headers={headers}
        />
    );
};
