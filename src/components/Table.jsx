/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import { getCategoryItem, getStatusOption } from "../app/table";
import { useState } from "react";

const Container = styled.article`
    margin: 3rem 2rem;
`;

const ControlPanel = styled.section`
    display: flex;
    justify-content: space-between;

    &>section{
        display: flex;
    }
`;

const Content = styled.table`
    width: 100%;
    border-spacing: 0 .2rem;
    text-align: left;
    
    &>*{
        background-color: ${({theme}) => theme.colors.main};
        &>tr{
            &>*{
                padding: .61rem 1rem;

                &>span{
                    font-size: 14px;
                    color: ${({theme}) => theme.colors.secondaryDimmed};
                }
            }
        }
    }
`;

const WrappedTd = styled.td`
    max-width: 11rem;
`

const Pagination = styled.section`
    margin-top: 1rem;
    display: flex;
    justify-content: center;
`;

const BasicFilter = styled.button`
    padding: .8rem;
    margin-bottom: 1rem;
    border: 0;
    border-bottom: 1px solid ${({theme}) => theme.colors.dimmed};
    border-radius: 0px;
    color: ${({theme}) => theme.colors.dimmed};
    outline: 0;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        outline: 0;
        border-color: ${({theme}) => theme.colors.secondary};
    }

    &:focus {
        outline: 0;
        border-color: ${({theme}) => theme.colors.secondary};
        border-bottom: 2.5px solid;
        color: ${({theme}) => theme.colors.secondary};
    }
`;

const SortSection = styled.section`
    font-size: 16px;
    max-height: 3rem;

    &>*{
        border-radius: 10px;
    }
`

const AddButton = styled.button`
    background-color: ${({theme}) => theme.colors.secondary};
    color: white;
    padding: 0 3.2rem;
    margin-right: 1.5rem;
`;

const SortButton = styled.button`
    border: 1px solid ${({theme}) => theme.colors.secondary};
    color: ${({theme}) => theme.colors.secondary};

    &>*{
        color: gray;
        transform: translate(2px, 3px);
    }
`;

const Identificator = styled.div`
    display: flex;
    gap: 1.5rem;

    &>img{
        border-radius: 20px;
        width: 10rem;
        aspect-ratio: 2/1;
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

const StatusButton = styled.button`
background-color: ${({ status, theme }) => 
    status === 'Available' ? '#5AD07A' : theme.colors.highlighted};    color: white;
`;

export const Table = ({ headers, data }) => {
  const categoryItem = getCategoryItem(headers);
  const statusOptions = getStatusOption(data);
  
  const [activeFilter, setActiveFilter] = useState('All');

  // Filters
  const basicFilters = [
    `All ${categoryItem === 'Room' ? 'Rooms' : categoryItem}`, 
    ...(statusOptions.length === 2 
      ? [`Active ${categoryItem}`, `Inactive ${categoryItem}`] 
      : statusOptions.map(status => `${status} ${categoryItem}`))
  ];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const filteredData = data.filter(item => {
    if (activeFilter.startsWith('All')) {
      return true;
    } else if (activeFilter.startsWith('Active')) {
      return item.status === 'Available' || item.status === 'Active';
    } else if (activeFilter.startsWith('Inactive')) {
      return item.status === 'Booked' || item.status === 'Inactive';
    } else {
      return item.status === activeFilter.replace(` ${categoryItem}`, '');
    }
  }).slice(0, 6);

  return (
    <Container>
      <ControlPanel>
        <section>
          {basicFilters.map((filter, index) => (
            <BasicFilter 
              key={`${index}-${filter}`} 
              onClick={() => handleFilterClick(filter)}
              isActive={activeFilter === filter}
            >
              {filter}
            </BasicFilter>
          ))}
        </section>
        <SortSection>
          <AddButton>+ New Room</AddButton>
          <SortButton>
            Newest <FaChevronDown />
          </SortButton>
        </SortSection>
      </ControlPanel>
      <Content>
        <thead>
          <tr>
            {headers.map((col, index) => <th key={`${index}-${col}`}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
          <tr key={item.id}>
            <td>
              <Identificator>
                <img src={item.picture} alt="" />
                <div>
                  <span>{`#${item.id}`}</span>
                  <strong>{`${item['room-type']}-${item.number}`}</strong>
                </div>
              </Identificator>
            </td>
            <td>{`${item['bed-type']} Bed`}</td>
            <td>{`Floor ${item['room-floor']}`}</td>
            <WrappedTd>{item.facilities.join(', ')}</WrappedTd>
            <td>{item.rate}<span> /night</span></td>
            <td>
              <StatusButton status={item.status}>
                {item.status}
              </StatusButton>
            </td>
          </tr>
          ))}
        </tbody>            
      </Content>
      <Pagination />
    </Container>
  );
};
