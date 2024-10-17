import React, { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { showToast } from "../../../utils/alerts"
import { NoPropagationButton } from "./TableButton"
import { Modal } from "../../alerts/Modal"
import { ModalStringsInterface as ModalStringsInterface } from '../../../types/alert.types'
import styled from "styled-components"

const Icon = styled(FaTrash)`
  padding: 1rem;
`

export const RemoveButton = (data: { item: { guest: any } }) => {
  const [modal, setModal] = useState(false);

  const modalStrings:ModalStringsInterface = {
    message:`Quieres eliminar a ${data.item.guest}?`,
    yesOption:'Sí',
    noOption:'Cancelar'
  }
  const handleYes=() => {
    showToast(`Eliminado ${data.item.guest}`);
  }

  const handleNo = () => {
    console.log('Fuera');
    setModal(false);
    console.log(modal);
  }

  const handleClick = () => {
    setModal(true);
  };
    return (
      <>
      <NoPropagationButton onClick={handleClick}>
        <Icon />
      </NoPropagationButton>


      {modal ? (
        <Modal
          strings={modalStrings}
          onCancel={handleNo}
          onYes={handleYes}
        />
      ) : null}
      </>
    )
  }