import { useParams } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { getAllThunk } from "../../features/bookings/bookingThunk";
import { getAllRoomsThunk } from "../../features/rooms/roomsThunk";

const Container = styled.section`
`;

export const GuestDetail = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();

    const guestId = Number(id);
    
    const guest = useSelector((state: RootState) => 
        state.booking.guests.find(guest => guest.id === guestId)
    );
    
    const room = useSelector((state: RootState) => 
        state.room.rooms.find(room => room.id === guest?.roomId)
    );    

    useEffect(() => {
        if (!guest) {
            dispatch(getAllThunk());
        }
        if (!room) {
            dispatch(getAllRoomsThunk());
        }
    }, [dispatch, guest, room]);

    if (!guest || !room) {
        return <p>Loading...</p>;
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(date));
    };

    return (
        <Container>
            <section>
                <img src={guest.picture} alt={`${guest.guest} profile`} />
                <section>
                    <h3>{guest.guest}</h3>
                    <small>{`ID: ${guest.id}`}</small>
                </section>
            </section>
            <section>
                <div>
                    <small>Check In</small>
                    <strong>{formatDate(guest.checkIn)}</strong>
                </div>
                <div>
                    <small>Check Out</small>
                    <strong>{formatDate(guest.checkOut)}</strong>
                </div>
            </section>
            <hr />
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
    );
};
