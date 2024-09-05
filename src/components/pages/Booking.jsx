// import { useParams } from "react-router-dom"
import { Table } from "../Table";
import data from '../../data/h-miranda_guests.json'

export const Booking = () => {
    // const { id } = useParams();
    const headers = ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", "Status"];
    
    return (
        <>
            {/* <h1>Booking</h1>
            <p>{id!='all' ? `ID: ${id}` : "Get All" }</p> */}
            <Table headers={headers} data={data}/>
        </>
    )
}