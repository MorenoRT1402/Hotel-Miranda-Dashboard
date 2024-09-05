import data from '../../data/h-miranda_concierges.json';
import { Table2 } from "../Table2";

export const Concierges = () => {
    const headers = ["Name", "Job Desk", "Schedule", "Contact", "Status"];

    return (
        <>
            {/* <h1>Booking</h1>
            <p>{id!='all' ? `ID: ${id}` : "Get All" }</p> */}
            {/* <Table headers={headers} data={data}/> */}
            <Table2 headers={headers} data={data} />
        </>
    )
}