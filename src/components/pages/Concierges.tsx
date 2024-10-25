import React from 'react';
import userThunk from '../../features/users/userThunk';
import { commonHeaders } from '../../app/table';
import { DataPage } from './DataPage';
import { useAppSelector } from '../../app/hooks';
import { resetStatus } from '../../features/users/userSlice';

export const Concierges = () => {
    const selector = useAppSelector(state => state.user);
    const headers = ["Name", "Job Desk", "Schedule", "Contact", ...commonHeaders];

    return (
        <DataPage 
        thunk={userThunk}
        selector={selector}
        dataKey={'users'}
        headers={headers}
        resetStatusAction={resetStatus}
        />
    )
};
