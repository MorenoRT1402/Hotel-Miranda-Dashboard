import { useParams } from "react-router-dom";
import styled from "styled-components"
import guestData from '../../data/h-miranda_guests.json';
import roomData from '../../data/h-miranda_rooms.json';

const Container = styled.section`

`;

export const GuestDetail = () => {
    const { id } = useParams();
    const getByID = (id, data) => data.find(item => item.id == id);
    const guest = getByID(id, guestData);
    const room = getByID(guest.roomId, roomData);

    return (
        <Container>
            <section>
                <img src={guest.picture} alt="" />
                <section>
                    <h3>{guest.guest}</h3>
                    <small>{`ID ${guest.id}`}</small>
                </section>
            </section>
            <section>
                <div>
                    <small>Check In</small>
                    <strong>{guest.checkIn}</strong>
                </div>
                <div>
                    <small>Check Out</small>
                    <strong>{guest.checkOut}</strong>
                </div>
            </section>
            <div>------------------------------------------</div>
            <section>
                <div>
                    <small>Room Info</small>
                    <strong>{room["room-type"]}</strong>
                </div>
                <div>
                    <small>Price</small>
                    <strong>{room.rate}</strong>
                </div>
            </section>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas commodi dolorum accusamus aperiam quod earum facilis facere at odit eveniet! Veritatis maiores quo aspernatur enim esse similique aut quos porro.</p>
        </Container>
    )
}