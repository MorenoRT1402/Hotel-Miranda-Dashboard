import { useState } from "react";
import styled from "styled-components";
import { LateralMenuLink } from "../LateralMenuLink";
import { MdSpaceDashboard, MdHotel, MdBook, MdPeople, MdRoomService } from "react-icons/md";

const Title = styled.h1`
    color: white;
`;

export const Home = () => {
    const [selectedLink, setSelectedLink] = useState(null);

    const menuLinks = [
        { title: "Dashboard", icon: MdSpaceDashboard },
        { title: "Room", icon: MdHotel },
        { title: "Bookings", icon: MdBook },
        { title: "Guests", icon: MdPeople },
        { title: "Concierge", icon: MdRoomService },
    ];


    return (
        <section className="bg-main">
            <nav>
                {menuLinks.map((link, index) => (
                    <LateralMenuLink
                        key={`${link.title}-${index}`}
                        text={link.title}
                        icon={link.icon}
                        isSelected={selectedLink === index}
                        onClick={() => setSelectedLink(index)}
                    />
                ))}
            </nav>
            <Title>Home</Title>
        </section>
    );
};
