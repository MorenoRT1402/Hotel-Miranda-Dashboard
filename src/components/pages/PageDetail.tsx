import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { AsyncThunk, UnknownAction } from "@reduxjs/toolkit";
import React from "react";

type DetailPageProps<T> = {
    selector: (state: RootState, id: string) => T | undefined;
    thunkAction: AsyncThunk<T[], void, any>;
    render: (data: T) => JSX.Element;
};

export const PageDetail = <T,>({ selector, thunkAction, render }: DetailPageProps<T>) => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();

    const data = useSelector((state: RootState) => selector(state, id!));

    useEffect(() => {
        if (!data) {
            dispatch(thunkAction());
        }
    }, [dispatch, data, thunkAction]);

    if (!data) {
        return <p>Loading...</p>;
    }

    return render(data);
};
