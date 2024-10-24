import React, { useEffect } from 'react';
import { Table } from '../table/Table';
import { PromiseStatus } from '../../utils/promises';
import { useAppDispatch } from '../../app/hooks';

export const DataPage = ({ thunkAction, resetStatusAction, selector, dataKey, headers }) => {
    const dispatch = useAppDispatch();
    const { status, error } = selector;
    const data = selector[dataKey]

    useEffect(() => {
        if (status === PromiseStatus.IDLE) {
            dispatch(thunkAction());
        }
    }, [dispatch, status, thunkAction]);

    useEffect(() => {
        return () => {
            dispatch(resetStatusAction());
        };
    }, [dispatch, resetStatusAction]);

    if (status === PromiseStatus.PENDING) {
        return <p>Loading...</p>;
    }

    if (status === PromiseStatus.REJECTED) {
        return <p>Error: {error}</p>;
    }

    return (
        <Table headers={headers} data={data} />
    );
};