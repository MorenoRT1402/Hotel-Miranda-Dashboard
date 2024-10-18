import styled from "styled-components";
import React, { useState } from "react";
import { TableRow } from "./TableRow";
import { TableControlPanel } from "./TableControlPanel";
import { TablePagination } from "./TablePagination";

//#region Style
const Container = styled.article`
    margin: 1.2rem;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Content = styled.table`
    width: 100%;
    border-spacing: 0 .2rem;
    text-align: left;
    
    &>*{
        background-color: ${({theme}) => theme.colors.main};
        &>tr{
            &>td{
                padding: .31rem 1rem;
            }
        }
    }
`;

//#region Component
export const Table = ({ headers, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [showedData, setShowedData] = useState([]);

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
      <TablePagination filteredData={filteredData} sortedData={sortedData} setShowedData={setShowedData}/>
    </Container>
  );
};
