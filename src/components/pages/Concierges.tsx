import React from 'react';
import userThunk from '../../features/users/userThunk';
import { commonHeaders } from '../../app/table';
import { resetStatus } from '../../features/users/userSlice';
import { DataPage } from './DataPage';
import { useAppSelector } from '../../app/hooks';

export const Concierges = () => {
    const selector = useAppSelector(state => state.user);
    const headers = ["Name", "Job Desk", "Schedule", "Contact", ...commonHeaders];

    return (
        <DataPage 
        thunkAction={userThunk.getAll}
        resetStatusAction={resetStatus}
        selector={selector}
        dataKey={'users'}
        headers={headers}
        />
    )
};
