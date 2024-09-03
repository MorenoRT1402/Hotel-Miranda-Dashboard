import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { LateralMenu } from "./lateral-menu/LateralMenu";
import { Header } from "./Header";

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