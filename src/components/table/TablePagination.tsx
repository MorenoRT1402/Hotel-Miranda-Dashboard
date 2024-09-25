import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styled from "styled-components";

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

const PageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isactive',
})<{ isactive: boolean }>`
  font-weight: ${({ isactive }) => (isactive ? 'bold' : 'normal')};
  background-color: ${({ isactive, theme }) => (isactive ? theme.colors.secondary : 'transparent')};
  color: ${({ isactive, theme }) => (isactive ? 'white' : theme.colors.secondary)};
  border: none;
  cursor: pointer;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isactive: isActive, theme }) => (isActive ? theme.colors.secondary : 'transparent')};
  }
`;

const ITEMS_PER_PAGE = 6;

export const TablePagination = ({filteredData, sortedData, setShowedData}) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalFiltered = filteredData.length;
    const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE);  

    const getVisiblePages = () => {
        const pages : number[] = [];
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

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      };
    
      const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
      };
    
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    
      useEffect(() => {
        const newShowedData = sortedData.length < 1 ? filteredData : sortedData;
        setShowedData(newShowedData.slice(startIndex, startIndex + ITEMS_PER_PAGE));
      }, [sortedData, startIndex, filteredData, setShowedData]);

    return (
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
            isactive={currentPage === page}
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

    )
}