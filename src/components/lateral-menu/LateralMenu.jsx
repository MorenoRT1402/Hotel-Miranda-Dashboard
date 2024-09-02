import { useState } from "react";
import styled from "styled-components";
import { LateralMenuLink } from "./LatMenuLink";
import { MdSpaceDashboard, MdHotel, MdBook, MdPeople, MdRoomService } from "react-icons/md";

const Menu = styled.section`
    padding: 1rem;
`;

const LinkNav = styled.nav`
    position: relative;
`;

export const LateralMenu = () => {
    const [selectedLink, setSelectedLink] = useState(null);

    const menuLinks = [
        { title: "Dashboard", icon: MdSpaceDashboard },
        { title: "Room", icon: MdHotel },
        { title: "Bookings", icon: MdBook },
        { title: "Guests", icon: MdPeople },
        { title: "Concierge", icon: MdRoomService },
    ];

    return (
        <Menu className="bg-main">
            <LinkNav>
                {menuLinks.map((link, index) => (
                    <LateralMenuLink
                        key={`${link.title}-${index}`}
                        text={link.title}
                        icon={link.icon}
                        isSelected={selectedLink === index}
                        onClick={() => setSelectedLink(index)}
                    />
                ))}
            </LinkNav>
        </Menu>
    );
};
