import styled from "styled-components";
import { getStringData } from "../app/table";

/* eslint-disable react/prop-types */


export const TestID = ({ item }) => {
    const hasRoomType = item['room-type'] !== undefined;
    console.log(hasRoomType);

    return (
        <>
        {!hasRoomType ? <strong>{item.name || item.guest}</strong> : <></>}
        </>
    );
}

export const Test = ({ item, colIndex }) => {
    const stringData = getStringData(item, colIndex);

    return (
        <section>
            {colIndex === 0 ? <TestID item={item} /> 
            : <strong>{stringData}</strong>
            }
        </section>
    )
}