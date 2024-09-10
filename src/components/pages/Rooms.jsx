import data from '../../data/h-miranda_rooms.json';
import { Table } from '../table/Table';

export const Rooms = () => {
    const headers = ["Room Name", "Bed Type", "Room Floor", "Facilities", "Rate", "Status"];

    return (
        <>
            {/* <h1>Booking</h1>
            <p>{id!='all' ? `ID: ${id}` : "Get All" }</p> */}
            {/* <Table headers={headers} data={data}/> */}
            <Table headers={headers} data={data} />
        </>
    )
}