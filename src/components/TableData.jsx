import styled from "styled-components";

/* eslint-disable react/prop-types */
const Identificator = styled.div`
    display: flex;
    gap: 1.5rem;
    min-width: 17rem;

    &>img{
        border-radius: 20px;
        width: 10rem;
        aspect-ratio: ${({ hasRoomType }) => (hasRoomType ? '2 / 1' : '1 / 2')};
    }

    &>div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;

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
    const hasRoomType = item['room-type'] !== undefined;

    return (
        <Identificator hasRoomType={hasRoomType}>
            <img src={item.picture} alt="" />
            <div>
                {!hasRoomType ? <strong>{item.name || item.guest}</strong> : <></>}
                <span>{`#${item.id}`}</span>
                {hasRoomType ? <strong>{`${item['room-type']}-${item.number}`}</strong> : <></>}
                {item.joined !== undefined ? <span>{item.joined}</span> : <></>}
            </div>
        </Identificator>
    );
}

export const TableData = ({ item, colIndex }) => {
    const stringData = getStringData(item, colIndex);


    return (
        <td>
            {colIndex === 0 ? <TableDataIdentificator item={item} /> 
            : <strong>{stringData}</strong>
            }
        </td>
    )
}