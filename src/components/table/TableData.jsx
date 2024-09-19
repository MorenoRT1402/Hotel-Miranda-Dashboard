import styled from "styled-components";
import { getStringData } from "../../app/table";

/* eslint-disable react/prop-types */
const Container = styled.td`
    max-width: 23rem;
`;

const Identificator = styled.div.attrs(hasroomtype => ({
    hasroomtype: hasroomtype ? true : undefined
}))`
    display: flex;
    gap: 1.5rem;
    min-width: 17rem;

    &>img{
        border-radius: 20px;
        aspect-ratio: ${({ hasroomtype }) => (hasroomtype ? '2 / 1' : '1 / 2')};
        max-height: 6rem;
        min-width: 5rem;
        max-width: 9rem;
    }

    &>div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* gap: 1rem; */

        &>span{
            font-size: 14px;
            color: ${({theme}) => theme.colors.secondaryDimmed};
        }

        &>strong{
            font-size: 16px;
        }
    }
`;

export const TableDataIdentificator = ({ item }) => {
    const hasroomtype = item['room-type'] !== undefined;

    return (
        <Identificator hasroomtype={hasroomtype}>
            <img src={item.picture} alt="" />
            <div>
                {!hasroomtype ? <strong>{item.name || item.guest}</strong> : <></>}
                <span>{`#${item.id}`}</span>
                {hasroomtype ? <strong>{`${item['room-type']}-${item.number}`}</strong> : <></>}
                {item.joined !== undefined ? <span>{item.joined}</span> : <></>}
            </div>
        </Identificator>
    );
}

export const TableData = ({ header, item, colIndex }) => {
    const stringData = colIndex !== 0 ? getStringData(header, item) : '';

    return (
        <Container>
            {colIndex === 0 ? <TableDataIdentificator item={item} /> 
            : <strong>{stringData}</strong>
            }
        </Container>
    )
}