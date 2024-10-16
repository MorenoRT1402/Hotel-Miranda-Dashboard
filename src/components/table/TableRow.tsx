import styled from "styled-components";
import { TableData } from "./TableData";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategory } from "../../app/table";
import React from "react";

const Container = styled.tr`
    cursor: pointer;
    position: relative;

    &>button{
        position: absolute;
        max-height: 3rem;
        max-width: 1rem;
        right: 0;
        top: 0;
    }
`;

export const TableRow = ({ headers, item }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Container key={item._id} onClick={() => navigate(`${location.pathname}/${item._id}`)}>
            {headers.map((header: string, index: number) => (
                <TableData key={`${index}-${item}`} header={header} item={item} colIndex={index} category={getCategory(headers)} />
            ))}
        </Container>
    );
};
