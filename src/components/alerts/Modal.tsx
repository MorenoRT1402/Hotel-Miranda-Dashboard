import React from "react"
import styled from "styled-components"
import { defaultModalStrings } from '../../types/alert.types'
import { NoPropagationButton } from "../table/buttons/TableButton";

const Container = styled.dialog`
    position: fixed;
    display: block;
    z-index: 10;
    top: 20rem;

    &>section{
        display: flex;
        justify-content: space-around;

        &>button {
            background-color: ${({theme}) => theme.colors.secondary};
            color: white;
            border: 1px solid;
            padding: .5rem;
            border-radius: 24px;
            width: 6rem;
        }
    }
`;

const ModalButton = styled(NoPropagationButton)`
    border: 1px solid black !important;
    background-color: initial;
    outline: initial;
`

export const Modal = ({strings=defaultModalStrings, onYes = () => {}, onCancel = () => {}}) => {

    return (
        <Container>
            <strong>{strings.message}</strong>
            <section>
                <ModalButton onClick={onYes}>{strings.yesOption}</ModalButton>
                <ModalButton onClick={onCancel}>{strings.noOption}</ModalButton>
            </section>
        </Container>
    )
}