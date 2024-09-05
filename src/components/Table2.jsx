/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getCategoryItem, getStatusOption } from "../app/table";
import { useState } from "react";
import { TableRow } from "./TableRow";

//#region Style
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
                padding: .31rem 1rem;

                &>span{
                    font-size: 14px;
                    color: ${({theme}) => theme.colors.secondaryDimmed};
                }
            }
        }
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

const Pagination = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const PageControls = styled.div`
  display: flex;
  align-items: center;

  button {
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.primary};
    margin: 0 0.5rem;

    &:disabled {
      cursor: not-allowed;
      color: ${({ theme }) => theme.colors.dimmed};
    }
  }

  span {
    margin: 0 0.5rem;
  }
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.dimmed};
`;

const PageButton = styled.button.attrs(props => ({
  'aria-pressed': props.isActive,
}))`
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.secondary : 'transparent')};
  color: ${({ isActive, theme }) => (isActive ? 'white' : theme.colors.secondary)};
  border: none;
  cursor: pointer;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isActive, theme }) => (isActive ? theme.colors.secondary : 'transparent')};
  }
`;

//#region Component
const ITEMS_PER_PAGE = 6;

export const Table2 = ({ headers, data }) => {
  const categoryItem = getCategoryItem(headers);
  const statusOptions = getStatusOption(data);
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  //#region Filters
  const basicFilters = [
    `All ${categoryItem === 'Room' ? 'Rooms' : categoryItem}`, 
    ...(statusOptions.length === 2 
      ? [`Active ${categoryItem}`, `Inactive ${categoryItem}`] 
      : statusOptions.map(status => `${status}`))
  ];

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

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
  })
  const pageData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

//#region Pagination
  const totalItems = data.length;
  const totalFiltered = filteredData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxPagesToShow = 4;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (end - start < maxPagesToShow - 1) {
      if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
        end = Math.min(totalPages, start + maxPagesToShow - 1);
      } else if (currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
        start = Math.max(1, end - maxPagesToShow + 1);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  //#region Return
  return (
    <Container>
      <ControlPanel>
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
          <AddButton>{`+ New ${categoryItem}`}</AddButton>
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
          {pageData.map((item, index) => (
            <TableRow key={`${item}-${index}`} headers={headers} item={item} />
          ))}
        </tbody>            
      </Content>

      <Pagination>
        <PaginationInfo>
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, totalFiltered)} of {totalFiltered} entries
        </PaginationInfo>

        <PageControls>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <FaChevronLeft />
          </button>

          {visiblePages.map((page) => (
            <PageButton
            key={page}
            isActive={currentPage === page}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PageButton>
          ))}

          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <FaChevronRight />
          </button>
        </PageControls>
      </Pagination>
    </Container>
  );
};
