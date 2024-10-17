import React, { useState, useEffect } from "react";
import { NoPropagationButton } from "./TableButton";
import styled from "styled-components";

const Container = styled.span`
  display: block;
  padding: 1rem;
  border-radius: 8px;
`;

export const StatusButton = ({ text, statusColors }) => {
  const [status, setStatus] = useState(text);
  const [backgroundColor, setBackgroundColor] = useState();

  const statusList = Object.keys(statusColors);

  useEffect(() => {
    setBackgroundColor(statusColors[status]);
  }, [status, statusColors]);

  const handleStatusChange = () => {
    const currentIndex = statusList.indexOf(status);
    const nextIndex = (currentIndex + 1) % statusList.length;
    setStatus(statusList[nextIndex]);
  };

  return (
    <NoPropagationButton onClick={handleStatusChange}>
      <Container style={{ backgroundColor }}>
        {status}
      </Container>
    </NoPropagationButton>
  );
};
