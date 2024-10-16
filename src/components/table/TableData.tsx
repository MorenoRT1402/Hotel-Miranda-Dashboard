import styled from "styled-components";
import { getStringData, statusColors, statusHeader } from "../../app/table";
import { StatusButton } from './StatusButton'
import React from "react";

const Container = styled.td`
    max-width: 23rem;
`;

const Identificator = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'hasroomtype',
  })<{ hasroomtype: boolean }>`
    display: flex;
    gap: 1.5rem;
    min-width: 17rem;
  
    & > img {
      border-radius: 20px;
      aspect-ratio: ${(props) => (props.hasroomtype ? '2/1' : '1/2')};
      max-height: 6rem;
      min-width: 5rem;
      max-width: 9rem;
    }

    &>div{
        display: flex;
        flex-direction: column;
        justify-content: center;

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
  const hasroomtype = item.bedType !== undefined;

  return (
    <Identificator hasroomtype={hasroomtype}>
      <img src={item.picture} alt="" />
      <div>
        {!hasroomtype ? <strong>{item.name || item.guest}</strong> : null}

        <span>{`#${item._id}`}</span>

        {hasroomtype ? <strong>{`${item.room.bedType}-${item.room.number}`}</strong> : null}
        
        {item.joined !== undefined ? <span>{item.joined}</span> : null}
      </div>
    </Identificator>
  );
};

export const TableData = ({ header, item, colIndex, category }) => {
    const stringData = colIndex !== 0 ? getStringData(header, item) : '';
    const isStatus = header.toLowerCase() == statusHeader;
    const isOptions = header.toLowerCase() == '';

    let content: string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
    if (colIndex === 0) {
        content = <TableDataIdentificator item={item} />;
    } else
        content = isStatus ? <StatusButton text={stringData} statusColors={statusColors[category]}/> : <strong>{stringData}</strong>;
  
    return <Container>{content}</Container>;
}