import React, { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { showToast } from "../../../utils/alerts"
import { NoPropagationButton } from "./TableButton"
import { Modal } from "../../alerts/Modal"
import { ModalStringsInterface as ModalStringsInterface } from '../../../types/alert.types'
import styled from "styled-components"
import { useAppDispatch } from "../../../app/hooks"
import { getDisplayName } from "../../../app/table"

const Icon = styled(FaTrash)`
  padding: 1rem;
`

export const RemoveButton = ({data, thunk}) => {
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();
  const name = getDisplayName(data);

  const modalStrings:ModalStringsInterface = {
    message:`Quieres eliminar a ${name}?`,
    yesOption:'Sí',
    noOption:'Cancelar'
  }
  const handleYes=() => {
    dispatch(thunk.remove(data._id));
    showToast(`Eliminado ${name}`);
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