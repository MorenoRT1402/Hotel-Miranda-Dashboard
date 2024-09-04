import { Table } from "../Table"
import data from '../../data/h-miranda_rooms.json';

export const Rooms = () => {
    const headers = ["Room Name", "Bed Type", "Room Floor", "Facilities", "Rate", "Status"];

    return (
        <>
            {/* <h1>Booking</h1>
            <p>{id!='all' ? `ID: ${id}` : "Get All" }</p> */}
            <Table headers={headers} data={data}/>
        </>
    )
}