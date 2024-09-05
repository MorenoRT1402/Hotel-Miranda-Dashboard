import data from '../../data/h-miranda_rooms.json';
import { Table2 } from "../Table2";

export const Rooms = () => {
    const headers = ["Room Name", "Bed Type", "Room Floor", "Facilities", "Rate", "Status"];

    return (
        <>
            {/* <h1>Booking</h1>
            <p>{id!='all' ? `ID: ${id}` : "Get All" }</p> */}
            {/* <Table headers={headers} data={data}/> */}
            <Table2 headers={headers} data={data} />
        </>
    )
}