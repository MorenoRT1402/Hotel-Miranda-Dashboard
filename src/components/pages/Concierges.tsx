import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Table } from '../table/Table';
import React, { useEffect } from 'react';
import { PromiseStatus } from '../../utils/promises';
import { getAllThunk } from '../../features/users/userThunk';

export const Concierges = () => {
    const headers = ["Name", "Job Desk", "Schedule", "Contact", "Status"];
    
    const { users, status, error } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

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
        <Table headers={headers} data={users} />
    );
};