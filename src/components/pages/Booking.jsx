// import { useParams } from "react-router-dom"
import { Table } from "../Table";
import data from '../../data/h-miranda_guests.json'
import { Table2 } from "../Table2";

export const Booking = () => {
    // const { id } = useParams();
    const headers = ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", "Status"];
    
    return (
        <>
            {/* <h1>Booking</h1>
            <p>{id!='all' ? `ID: ${id}` : "Get All" }</p> */}
            <Table2 headers={headers} data={data}/>
        </>
    )
}