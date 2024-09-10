import { FaArrowLeft, /* FaRegHeart */ } from "react-icons/fa";
import styled, { /* useTheme */ } from "styled-components"
import { NotificationButton } from "../NotificationButton";
import { IoMailOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
// import { MdOutlineComment } from "react-icons/md";
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
    /* width: 80%; */
    
    &>h2{
        font-size: 28px;
        margin-block: 0;
    }

    & span{
        color: gray;
    }
`;

// const SearchBar = styled.div`
    
// `

const Icons = styled.section`
    flex: 4;
`;

// const Separator = styled.div`
// `;

// const LanguageContainer = styled.article`
// `;

export const Header = () => {
    const {dispatch} = useContext(AuthContext);
    // const theme = useTheme();
    const location = useLocation();
    const route = location.pathname;
    const title = getPageByRoute(route).title;
    const {id} = useParams();

    const logout = () => {
        dispatch({type: authActions.LOGOUT})
        onLogout();
        window.location.reload();
    }

    return (
        <Container className="bg-main">
            <Menu>
                <FaArrowLeft/>
                <Path>
                    <h2>{title}</h2>
                    {id ? <small className="color-secondary">{`${title}`} / <span>{id}</span></small> : <></>}
                </Path>
                {/* <SearchBar>
                    <input type="text" />
                    <img src="" alt="" />
                </SearchBar> */}
                <Icons>
                    {/* <NotificationButton icon={FaRegHeart}/> */}
                    <NotificationButton icon={IoMailOutline} number={2}/>
                    <NotificationButton icon={GoBell} number={87}/>
                    {/* <NotificationButton icon={MdOutlineComment} number={'!'} color={theme.colors.secondary}/> */}
                    <NotificationButton icon={RiLogoutBoxLine} onClick={logout} />
                </Icons>
                {/* <img src="" alt="" />
                <Separator /> */}
                {/* <LanguageContainer>
                    <small className="color-highlighted">EN</small>
                    <img src="" alt="" />
                </LanguageContainer> */}
            </Menu>
        </Container>
    )
}