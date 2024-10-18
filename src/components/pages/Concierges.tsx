import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Table } from '../table/Table';
import React, { useEffect } from 'react';
import { PromiseStatus } from '../../utils/promises';
import userThunk from '../../features/users/userThunk';
import { commonHeaders } from '../../app/table';

export const Concierges = () => {
    const dispatch = useAppDispatch();
    const { users, status, error } = useAppSelector(state => state.user);
    const headers = ["Name", "Job Desk", "Schedule", "Contact", ...commonHeaders];
    

    useEffect(() => {
        if (status === PromiseStatus.IDLE) {
            dispatch(userThunk.getAll());
        }
    }, [dispatch, status]);

    if (status === PromiseStatus.PENDING) {
        return <p>Loading...</p>;
    }

    if (status === PromiseStatus.REJECTED) {
        return <p>Error: {error}</p>;
    }

    return (
        <Table headers={headers} data={users} />
    );
};
