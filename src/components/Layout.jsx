import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { LateralMenu } from "./lateral-menu/LateralMenu";
import { Header } from "./Header";
import { pages } from "../app/pages";
import { getToken } from "../app/auth";
import { useEffect } from "react";

const Container = styled.section`
    display: flex;
    flex-direction: row;

    &>*{
        flex: 1;
    }

    &>*:first-child{
        max-width: 16.5%;
    }
`;

export const Layout = () => {
    const navigate = useNavigate('');

    useEffect(() => {
        if(getToken() == null)
            navigate(pages.login.path);
    }, [navigate])

    return (
        <Container className="bg-dimmed-medium">
            <LateralMenu />
            <div>
                <Header/>
                <Outlet />
            </div>
        </Container>
    );
};