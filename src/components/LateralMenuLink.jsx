import styled from "styled-components";

const containerPadding = '1rem';

const Container = styled.article`
    display: flex;
    gap: .5rem;
    align-items: center;
    padding: ${containerPadding};
    cursor: pointer;
`;

const Border = styled.div`
    width: 3rem;
    height: 2rem;
    margin-left: calc(-${containerPadding} - 2.7rem);
    margin-right: 1rem;
    border-radius: 5px;
`;

// eslint-disable-next-line react/prop-types
export const LateralMenuLink = ({ text, icon: IconComp, isSelected, onClick }) => {

    return (
        <Container onClick={onClick}>
            <Border className={isSelected ? "bg-highlighted" : "bg-transparent"}/>
            {IconComp ? <IconComp className={isSelected ? "color-highlighted" : ""}/> : <></>}
            <strong>{text}</strong>
        </Container>
    );
};
