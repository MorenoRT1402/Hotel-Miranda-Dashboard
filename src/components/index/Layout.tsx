import styled from "styled-components";
import { Outlet, /* useNavigate */ } from "react-router-dom";
import { LateralMenu } from "./lateral-menu/LateralMenu";
import { Header } from "./Header";
import React from "react";

const Container = styled.section`
    display: flex;
    flex-direction: row;

    &>*{
        flex: 1;
    }

    &>*:first-child{
        max-width: 16.5%;
    }

    &>div{
        display: flex;
        flex-direction: column;
    }
`;

export const Layout = () => {
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