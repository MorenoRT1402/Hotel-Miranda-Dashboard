import { useState } from "react";
import styled from "styled-components";
import { LateralMenuLink } from "./LatMenuLink";
import { MdSpaceDashboard, MdHotel, MdBook, MdPeople, MdRoomService } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const Menu = styled.section`
    padding: 1.3rem 2rem;
    width: 16.5%;
    min-width: 11rem;
    text-align: left;
`;

const Header = styled.header`
    height: 3rem;
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;

    &>img{
        height: 100%;
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
    padding: 1.2rem;
    border-radius: 26px;
    margin: .4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

    const menuLinks = [
        { title: "Dashboard", icon: MdSpaceDashboard },
        { title: "Room", icon: MdHotel },
        { title: "Bookings", icon: MdBook },
        { title: "Guests", icon: MdPeople },
        { title: "Concierge", icon: MdRoomService },
    ];

    return (
        <Menu className="bg-main">
            <Header>
                <img src="/images/hotel-svgrepo-com.svg" alt="" />
                <section>
                    <h2>travl</h2>
                    <small className="color-dimmed">Hotel Admin Dashboard</small>
                </section>
            </Header>
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
            <UserCard>
                <img src="https://picsum.photos/300/200" alt="" />
                <h4>William Johanson</h4>
                <small className="color-dimmed">williamjohn@mail.com</small>
                <button className="bg-secondary-dimmed color-secondary">Contact us</button>
            </UserCard>
            <PolicyText>
                <strong>Travl Hotel Admin Dashboard</strong>
                <span className="color-dimmed">@2024 All rights reserved</span>
            </PolicyText>
            <WithLove className="color-dimmed">Made with <Heart/> by MorenoRT</WithLove>
        </Menu>
    );
};
