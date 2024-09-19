import { useState, useEffect } from "react";
import styled from "styled-components";

const StatusBtnContainer = styled.button`

`;

export const StatusButton = ({text, statusColors}) => {
    const [status, setStatus] = useState(text);
    const [backgroundColor, setBackgroundColor] = useState();

    const statusList = Object.keys(statusColors);

    useEffect(() => {
      setBackgroundColor(statusColors[status]);
    }, [status, statusColors]);
  
    const handleStatusChange = (event) => {
        event.stopPropagation();
        const currentIndex = statusList.indexOf(status);
        const nextIndex = (currentIndex + 1) % statusList.length;
        setStatus(statusList[nextIndex]);
    };

    return (
        <StatusBtnContainer style={{ backgroundColor }} onClick={handleStatusChange}>
            {status}
        </StatusBtnContainer>
    );
};