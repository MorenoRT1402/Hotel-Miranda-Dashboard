import { useParams } from "react-router-dom"

export const Booking = () => {
    const { id } = useParams();

    return (
        <>
            <h1>Booking</h1>
            <p>{id!='all' ? `ID: ${id}` : "Get All" }</p>
        </>
    )
}