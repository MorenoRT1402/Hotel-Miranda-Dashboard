import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components"
import { NotificationButton } from "../NotificationButton";
import { IoMailOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useLocation, useParams } from "react-router-dom";
import { getPageByRoute } from "../../app/pages";
import { onLogout } from "../../app/auth";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { authActions } from "../../app/actions";

const Container = styled.header`
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;

    &>*{
        padding: 1.5rem 2rem;
    }
    `;

const Menu = styled.section`
    display: flex;
    align-items: center;
    flex: 1;
    padding-left: 0;
    min-height: 4rem;

    &>svg{
        flex: 1;
    }
`;

const Path = styled.section`
    display: flex;
    flex-direction: column;
    align-items: start;
    font-size: 14px;
    flex: 9;
    
    &>h2{
        font-size: 28px;
        margin-block: 0;
    }

    & span{
        color: gray;
    }
`;

const Icons = styled.section`
    flex: 4;
`;

export const Header = () => {
    const {dispatch} = useContext(AuthContext);
    const location = useLocation();
    const route = location.pathname;
    const page = getPageByRoute(route);
    const {id} = useParams();

    const logout = () => {
        dispatch({type: authActions.LOGOUT})
        onLogout();
        window.location.reload();
    }

    const title = id ? page.detailTitle : page.title;

    return (
        <Container className="bg-main">
            <Menu>
                <FaArrowLeft/>
                <Path>
                    <h2>{title}</h2>
                    {id ? <small className="color-secondary">{`${page.uri}`} / <span>{id}</span></small> : <></>}
                </Path>
                <Icons>
                    <NotificationButton icon={IoMailOutline} number={2}/>
                    <NotificationButton icon={GoBell} number={87}/>
                    <NotificationButton icon={RiLogoutBoxLine} onClick={logout} />
                </Icons>
            </Menu>
        </Container>
    )
}