// import { useParams } from "react-router-dom"
import { Table } from "../Table";
import data from '../../data/h-miranda_guests.json'
import { Table2 } from "../Table2";
import { Test } from "../Test";
import { TableData } from "../TableData";
import { TableRow } from "../TableRow";

export const Booking = () => {
    // const { id } = useParams();
    const headers = ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", "Status"];
    
    return (
        <>
            {/* <h1>Booking</h1>
            <p>{id!='all' ? `ID: ${id}` : "Get All" }</p> */}
            <Table2 headers={headers} data={data}/>
            {/* <Test item={data[0]} colIndex={0}></Test>
            <table>
                <tbody>
                    <tr>
                    <TableData item={data[0]} colIndex={0}></TableData>
                    <TableData item={data[0]} colIndex={1}></TableData>
                    <TableData item={data[0]} colIndex={2}></TableData> 
                    <TableData item={data[0]} colIndex={3}></TableData>
                    <TableData item={data[0]} colIndex={4}></TableData>
                   
                    </tr>
                </tbody>
            </table> */}
            {/* <table>
            <thead>
          <tr>
            {headers.map((col, index) => <th key={`${index}-${col}`}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableRow key={`${index}-${item}`} headers={headers} item={item} />
          ))}
        </tbody>  
            </table> */}
        </>
    )
}