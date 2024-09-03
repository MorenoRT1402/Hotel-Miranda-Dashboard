import styled from "styled-components";
import { LateralMenu } from "../lateral-menu/LateralMenu";
import { Header } from "../Header";

const Title = styled.h1`
    /* color: white; */
`;

const Container = styled.section`
    display: flex;
    flex-direction: row;

    &>*{
        flex: 1;
    }

    &>*:first-child{
        max-width: 16.5%;
    }
`

export const Home = () => {

    return (
        <Container className="bg-dimmed-medium">
            <LateralMenu />
            <div>
                <Header/>
                <Title className="color-secondary">Home</Title>
            </div>
        </Container>
    );
};
