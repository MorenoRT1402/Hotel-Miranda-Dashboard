import React from "react";
import styled from "styled-components";

const Container = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

export const NoPropagationButton = ({ onClick, children }) => {
  const handleClick = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
    onClick(event);
  };

  return <Container onClick={handleClick}>{children}</Container>;
};