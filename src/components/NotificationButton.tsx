import React from "react"
import styled from "styled-components"

const Container = styled.button`
    background-color: transparent;
    outline: none;
    border: 0;

    &>*{
        position: relative;
    }
`

const Notification = styled.span.withConfig({
    shouldForwardProp: prop => prop !== "bg"
})<{ bg : string}>`
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

export const NotificationButton = ({icon:IconComp, number, color, onClick}) => {
    return (
        <Container onClick={onClick}>
            {IconComp ? <IconComp /> : <></>}
            {number ? <Notification bg={color}>{number}</Notification> : <></> }
        </Container>
    )
}