import React from 'react';
import { commonHeaders } from '../../app/table';
import roomThunk from '../../features/rooms/roomsThunk';
import { DataPage } from './DataPage';
import { useAppSelector } from '../../app/hooks';
import { resetStatus } from '../../features/rooms/roomsSlice';

export const Rooms = () => {
    const selector = useAppSelector((state) => state.room);
    const headers = ["Room Name", "Bed Type", "Room Floor", "Facilities", "Rate", ...commonHeaders];

    return (
        <DataPage
            thunk={roomThunk}
            selector={selector}
            dataKey={'rooms'}
            headers={headers}
            resetStatusAction={resetStatus}
        />
    );
};
