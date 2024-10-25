import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import React from "react";

type DetailPageProps<T> = {
    selector: (state: RootState, id: string) => T | undefined;
    thunk: any;
    render: (data: T) => JSX.Element;
};

export const PageDetail = <T,>({ selector, thunk, render }: DetailPageProps<T>) => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();

    const [localData, setLocalData] = useState<T | undefined>(undefined);

    const reduxData = useSelector((state: RootState) => selector(state, id!));

    useEffect(() => {
        if (reduxData) {
            setLocalData(reduxData);
        }
    }, [reduxData]);

    useEffect(() => {
        if (!id) return;
        dispatch(thunk.getById(id));
    }, [dispatch, id, reduxData, thunk]);

    if (!localData) {
        return <p>Loading...</p>;
    }

    return render(localData);
};
