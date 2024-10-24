import { getDisplayName } from "../../app/table";
import styled from "styled-components";
import React from "react";
import { PageDetail } from "./PageDetail";
import bookingThunk from "../../features/bookings/bookingThunk";
import { formatDateTime } from "../../utils/dates";
import { getID } from "../../app/utils";

const Container = styled.section`
    padding: 2rem;
    &>section{
        &>img{
            max-height: 15rem;
        }
    }
`;

export const GuestDetail = () => {
    return (
        <PageDetail
            selector={(state) => state.booking.guest}
            thunk={bookingThunk}
            render={(booking) => {
                const name = getDisplayName(booking);

                if(!booking)
                    return <p>Error</p>
                    
                return (
                    <Container>
                        <section>
                            <img src={booking?.picture} alt={`${name} profile`} />
                            <section>
                                <h3>{name}</h3>
                                <small>{`ID: ${getID(booking)}`}</small>
                            </section>
                        </section>
                        <section>
                            <div>
                                <small>Check In</small>
                                <strong>{formatDateTime(booking.checkIn)}</strong>
                            </div>
                            <div>
                                <small>Check Out</small>
                                <strong>{formatDateTime(booking.checkOut)}</strong>
                            </div>
                        </section>
                        <hr />
                        <section>
                            <div>
                                <small>Room Info</small>
                                <strong>{booking.room.roomType}</strong>
                            </div>
                            <div>
                                <small>Price</small>
                                <strong>{booking.room.rate}</strong>
                            </div>
                        </section>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas commodi dolorum accusamus aperiam quod earum facilis facere at odit eveniet! Veritatis maiores quo aspernatur enim esse similique aut quos porro.</p>
                    </Container>
                );
            }}
        />
    );
};
