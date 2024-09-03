import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.article`
    display: flex;
    gap: .5rem;
    align-items: center;
    cursor: pointer;

    &>strong{
        opacity: 1;
    }
`;

const Border = styled.div`
    position: absolute;
    width: 3rem;
    height: 2rem;
    left: -4.75rem;
    border-radius: 5px;
`;


// eslint-disable-next-line react/prop-types
export const LateralMenuLink = ({ text, icon: IconComp, isSelected, onClick, route }) => {
    const navigate = useNavigate();
    const colorClass = isSelected ? "color-highlighted" : "color-secondary-dimmed";

    const handleClick = () => {
        onClick();
        navigate(route);
    };

    return (
        <Container onClick={handleClick}>
            <Border className={isSelected ? "bg-highlighted" : "bg-transparent"}/>
            {IconComp ? <IconComp className={colorClass}/> : <></>}
            <strong className={colorClass}>{text}</strong>
        </Container>
    );
};
