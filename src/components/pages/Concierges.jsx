import { useDispatch, useSelector } from 'react-redux';
import { Table } from '../table/Table';
import { useEffect } from 'react';
import { promiseStatus } from '../../utils/promises';
import { getAllThunk } from '../../features/users/userThunk';

export const Concierges = () => {
    const headers = ["Name", "Job Desk", "Schedule", "Contact", "Status"];
    
    const { users, status, error } = useSelector(state => state.user);
    const dispatch = useDispatch();

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
        <Table headers={headers} data={users} />
    );
};
