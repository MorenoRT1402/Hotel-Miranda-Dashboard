import styled from "styled-components";
import { TableData } from "./TableData";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategory } from "../../app/table";
import React from "react";

const Container = styled.tr`
    cursor: pointer;
`;

export const TableRow = ({ headers, item }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Container key={item.id} onClick={() => navigate(`${location.pathname}/${item.id}`)}>
            {headers.map((header, index) => (
                <TableData key={`${index}-${item}`} header={header} item={item} colIndex={index} category={getCategory(headers)} />
            ))}
        </Container>
    );
};
