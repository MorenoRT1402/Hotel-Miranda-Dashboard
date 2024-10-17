import React from "react"
import styled from "styled-components"
import { defaultModalStrings } from '../../types/alert.types'
import { NoPropagationButton } from "../table/buttons/TableButton";

const Container = styled.dialog`
    display: block;

    &>section{
        &>button{
            border: initial;
            background-color: initial;
            outline: initial;
        }
    }
`;

export const Modal = ({strings=defaultModalStrings, onYes = () => {}, onCancel = () => {}}) => {

    return (
        <Container>
            <strong>{strings.message}</strong>
            <section>
                <NoPropagationButton onClick={onYes}>{strings.yesOption}</NoPropagationButton>
                <NoPropagationButton onClick={onCancel}>{strings.noOption}</NoPropagationButton>
            </section>
        </Container>
    )
}