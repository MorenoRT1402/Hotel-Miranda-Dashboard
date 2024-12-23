import styled from "styled-components";
import React from "react";
import roomThunk from "../../features/rooms/roomsThunk";
import { PageDetail } from "./PageDetail";
import { getFinalPrice, textToArray } from '../../app/utils'

const Container = styled.section`
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 800px;
    margin: 0 auto;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    img {
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 100%;
        max-height: 300px;
        object-fit: cover;
    }
`;

const RoomInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    div {
        background-color: #f9f9f9;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

        small {
            display: block;
            color: #555;
            margin-bottom: 0.5rem;
        }

        strong {
            font-size: 1.1rem;
            color: #333;
        }
    }
`;

const Facilities = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0;
    
    li {
        background-color: #eee;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        color: #666;
    }
`;

const PriceSection = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    align-items: center; /* Alinear contenido verticalmente */

    h3 {
        font-size: 1.5rem;
        color: #333;
        margin-bottom: 0.5rem;
    }

    .original-price {
        font-size: 1rem;
        color: #941313;
        text-decoration: line-through;
        margin-bottom: 0.5rem;
    }

    .final-price {
        font-size: 2rem;
        font-weight: bold;
        color: #2d8519;
    }

    .price-container {
        text-align: right;
    }

    .discount {
        font-size: 1rem;
        color: #999;
    }
`;


export const RoomDetail = () => {
    return (
        <PageDetail
            selector={(state) => state.room.room}
            thunk={roomThunk}
            render={(room) => {
                if(!room)
                    return <p>Error</p>
                return (
                    <Container>
                        <ImageContainer>
                            <img src={room?.picture} alt={`${room?.roomType} Room`} />
                        </ImageContainer>

                        <RoomInfo>
                            <div>
                                <small>Room Type</small>
                                <strong>{room?.roomType}</strong>
                            </div>
                            <div>
                                <small>Room Number</small>
                                <strong>{room?.number}</strong>
                            </div>
                            <div>
                                <small>Bed Type</small>
                                <strong>{room?.bedType}</strong>
                            </div>
                            <div>
                                <small>Room Floor</small>
                                <strong>{room?.roomFloor}</strong>
                            </div>
                            <div>
                                <small>Status</small>
                                <strong>{room?.status}</strong>
                            </div>
                        </RoomInfo>

                        <section>
                            <h4>Facilities</h4>
                            <Facilities>
                                {textToArray(room.facilities).map((facility, index) => (
                                    <li key={index}>{facility}</li>
                                ))}
                            </Facilities>
                        </section>

                        <PriceSection>
                            <div>
                                <h3>Price</h3>
                            </div>
                            <div className="price-container">
                                {room?.discount && (
                                    <div className="original-price">{room.rate}</div>
                                )}
                                <div className="final-price">
                                    ${getFinalPrice(parseFloat(room.rate.slice(1)), room.discount)}
                                </div>
                                {room.discount && (
                                    <div className="discount">Discount: {room.discount}%</div>
                                )}
                            </div>
                        </PriceSection>
                    </Container>
                );
            }}
        />
    );
};
