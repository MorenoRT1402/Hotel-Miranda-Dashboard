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
    position: absolute;
    width: 3rem;
    height: 2rem;
    left: calc(-${containerPadding} - 2.7rem);
    border-radius: 5px;
`;


// eslint-disable-next-line react/prop-types
export const LateralMenuLink = ({ text, icon: IconComp, isSelected, onClick }) => {
    const colorClass = isSelected ? "color-highlighted" : "color-dimmed";

    return (
        <Container onClick={onClick}>
            <Border className={isSelected ? "bg-highlighted" : "bg-transparent"}/>
            {IconComp ? <IconComp className={colorClass}/> : <></>}
            <strong className={colorClass}>{text}</strong>
        </Container>
    );
};
