import styled from "styled-components"

const Container = styled.button`
    background-color: transparent;
    outline: none;
    border: 0;

    &>*{
        position: relative;
    }

    &>span{

    }
`

const Notification = styled.span`
        position: absolute;
        transform: translate(-.3rem, -.6rem);
        background-color: ${({ bg, theme }) => bg || theme.colors.highlighted};
        color: white;
        border-radius: 5px;
        width: 1rem;
        aspect-ratio: 1/1;
        padding: .1rem;
        text-align: center;
        font-size: 90%;
`

// eslint-disable-next-line react/prop-types
export const NotificationButton = ({icon:IconComp, number, color}) => {
    return (
        <Container>
            {IconComp ? <IconComp /> : <></>}
            {number ? <Notification bg={color}>{number}</Notification> : <></> }
        </Container>
    )
}