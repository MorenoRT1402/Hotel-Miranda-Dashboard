/* eslint-disable react/prop-types */
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TableRow } from "./TableRow";
import { TableControlPanel } from "./TableControlPanel";

//#region Style
const Container = styled.article`
    margin: 1.2rem;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;

    &>table{
      flex: 1;
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
            }
        }
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


export const Table = ({ headers, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [showedData, setShowedData] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(1);
    
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  useEffect(() => {
    const newShowedData = sortedData.length < 1 ? filteredData : sortedData;
    setShowedData(newShowedData.slice(startIndex, startIndex + ITEMS_PER_PAGE));
  }, [sortedData, startIndex, filteredData]);

//#region Pagination
  const totalFiltered = filteredData.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE);

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
      <TableControlPanel headers={headers} data={data} filteredData={filteredData} 
      setFilteredData={setFilteredData} setSortedData={setSortedData} />

      <Content>
        <thead>
          <tr>
            {headers.map((col, index) => <th key={`${index}-${col}`}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {showedData.map((item, index) => (
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
