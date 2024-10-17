import { useState } from "react";
import styled from "styled-components";
import { LateralMenuLink } from "./LatMenuLink";
import { MdSpaceDashboard, MdHotel, MdBook, MdRoomService, MdPeople } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { pages } from "../../../app/pages";
import { getUser } from "../../../utils/persistence";

const Menu = styled.section`
    padding: 1.3rem 2rem;
    width: 16.5%;
    max-width: 14rem;
    min-width: 11rem;
    text-align: left;
    box-shadow: 13px 3px 40px #00000005;
    position: relative;
    z-index: 20;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Logo = styled.article`
    height: 4rem;
    display: flex;
    gap: 2rem;

    &>img{
        height: 100%;
        max-height: 6rem;
    }

    &>section{
        display: flex;
        flex-direction: column;
        text-align: left;

        &>h2{
            margin: 0;
        }
        &>small{
            font-size: 10px;
        }
    }
`;

const LinkNav = styled.nav`
    padding-block: 1.2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const UserCard = styled.article`
    box-shadow: 1px 65px 126px -52px gray;
    padding-block: 1.2rem;
    border-radius: 26px;
    margin: .4rem;
    display: flex;
    flex-direction: column;
    gap: .8rem;
    align-items: center;

    &>*{
        margin: 0;
    }

    &>img{
        width: 34%;
        aspect-ratio: 1 / 1.1;
        border-radius: 10px;
    }

    &>small{
        font-size: 12px;
    }

    &>button{
        background-color: #EBF1EF;
    }
`;

const PolicyText = styled.section`
    display: flex;
    flex-direction: column;
    margin-block: 3rem;

    &>small{
        font-size: 12px;
    }
`

const WithLove = styled.span`
    font-size: 13px;
`

const Heart = styled(FaHeart)`
    color: inherit;
`

export const LateralMenu = () => {
    const [selectedLink, setSelectedLink] = useState(null);
    const {username, email} = getUser();

    const menuLinks = [
        { title: "Dashboard", icon: MdSpaceDashboard, route: '/' },
        { title: "Bookings", icon: MdBook, route: pages.booking.path},
        { title: "Room", icon: MdHotel, route: pages.rooms.path},
        { title: "Contact", icon: MdPeople, route: pages.contact.path},
        { title: "Concierge", icon: MdRoomService, route: pages.users.path},
    ];

    return (
        <Menu className="bg-main">
            <Logo className="bg-main">
                <img src="/images/hotel-svgrepo-com.svg" alt="" />
                <section>
                    <h2>travl</h2>
                    <small className="color-dimmed">Hotel Admin Dashboard</small>
                </section>
            </Logo>
            <LinkNav>
                {menuLinks.map((link, index) => (
                    <LateralMenuLink
                        key={`${link.title}-${index}`}
                        text={link.title}
                        icon={link.icon}
                        isSelected={selectedLink === index}
                        onClick={() => setSelectedLink(index)}
                        route={link.route}
                    />
                ))}
            </LinkNav>
            <UserCard>
                <img src="https://picsum.photos/300/200" alt="" />
                <h4>{username}</h4>
                <small className="color-dimmed">{email}</small>
                <button className="color-secondary">Edit</button>
            </UserCard>
            <section>
            <PolicyText>
                <strong>Travl Hotel Admin Dashboard</strong>
                <span className="color-secondary-dimmed">@2024 All rights reserved</span>
            </PolicyText>
            <WithLove className="color-secondary-dimmed">Made with <Heart/> by MorenoRT</WithLove>
            </section>
        </Menu>
    );
};
