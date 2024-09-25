/* eslint-disable react/prop-types */
import styled from "styled-components";
import { getCategory, getCategoryItem, getStatusOption, itemInThisFilter } from "../../app/table";
import { useEffect, useState } from "react";
import { TableSort } from "./TableSort";
import { NewDataForm } from "./NewDataForm";

const ControlPanel = styled.section`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    &>section{
        display: flex;
    }
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
        min-height: 3rem;
    }
`

const AddButton = styled.button`
    background-color: ${({theme}) => theme.colors.secondary};
    color: white;
    padding: 0 3.2rem;
    margin-right: 1.5rem;
`;

export const TableControlPanel = ({ headers, data, filteredData, setFilteredData, setSortedData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const statusOptions = getStatusOption(data);

  const categoryItem = getCategoryItem(headers);

  const isRoom = categoryItem === 'Room';

  const getAllFilterName = `All ${isRoom ? 'Rooms' : categoryItem}`;

  const basicFilters = !isRoom ? [
      getAllFilterName, 
      ...(statusOptions.length === 2 
        ? [`Active ${categoryItem}`, `Inactive ${categoryItem}`] 
        : statusOptions.map(status => `${status}`))
      ]
      : [];

      useEffect(() => {
          setFilteredData(data.filter(item => itemInThisFilter(activeFilter, categoryItem, item))
        )
        }, [data, activeFilter, categoryItem, setFilteredData])
  
  return (
      <ControlPanel>
      {modalVisible ? <NewDataForm data={data} category={getCategory(headers)} close={() => setModalVisible(false)}/> : <></>}
      <section>
        {basicFilters.map((filter, index) => (
          <BasicFilter 
            key={`${index}-${filter}`} 
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </BasicFilter>
        ))}
      </section>
      <SortSection>
        <AddButton onClick={() => setModalVisible(true)}>{`+ New ${categoryItem}`}</AddButton>
        {!isRoom ? <TableSort category={categoryItem} filteredData={filteredData} setSortedData={setSortedData}/>: <></>}
      </SortSection>
    </ControlPanel>
  )
}