import data from '../../data/h-miranda_concierges.json';
import { Table } from '../table/Table';

export const Concierges = () => {
    const headers = ["Name", "Job Desk", "Schedule", "Contact", "Status"];

    return (
        <>
            {/* <h1>Booking</h1>
            <p>{id!='all' ? `ID: ${id}` : "Get All" }</p> */}
            {/* <Table headers={headers} data={data}/> */}
            <Table headers={headers} data={data} />
        </>
    )
}