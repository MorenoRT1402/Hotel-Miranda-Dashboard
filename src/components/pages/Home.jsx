import styled from "styled-components";
import { LateralMenu } from "../lateral-menu/LateralMenu";

const Title = styled.h1`
    /* color: white; */
`;

export const Home = () => {

    return (
        <section className="bg-main">
            <LateralMenu />
            <Title className="color-secondary">Home</Title>
        </section>
    );
};
