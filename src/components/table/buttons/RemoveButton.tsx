import React, { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { showToast } from "../../../utils/alerts"
import { NoPropagationButton } from "./TableButton"
import { Modal } from "../../alerts/Modal"
import { ModalStringsInterface as ModalStringsInterface } from '../../../types/alert.types'
import styled from "styled-components"
import { useAppDispatch } from "../../../app/hooks"

const Icon = styled(FaTrash)`
  padding: 1rem;
`

export const RemoveButton = (data: { item: { _id: string, guest: any }} ,thunk: any) => {
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();

  const modalStrings:ModalStringsInterface = {
    message:`Quieres eliminar a ${data.item.guest}?`,
    yesOption:'Sí',
    noOption:'Cancelar'
  }
  const handleYes=() => {
    dispatch(thunk.remove(data.item._id));
    showToast(`Eliminado ${data.item.guest}`);
  }

  const handleNo = () => {
    setModal(false);
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