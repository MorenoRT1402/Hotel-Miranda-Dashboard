import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa";

const Container = styled.article`
    margin: 3rem 2rem;
`;

const ControlPanel = styled.section`
    display: flex;
    justify-content: space-between;

    &>section{
        display: flex;
    }
`;

const Content = styled.table`
    width: 100%;
    margin-top: 1rem;
`;

const Pagination = styled.section`
    margin-top: 1rem;
    display: flex;
    justify-content: center;
`;

const BasicFilter = styled.button`
    padding: 1rem;
    border: 0;
    border-bottom: 1px solid ${({theme}) => theme.colors.dimmed};
    border-radius: 0px;
    color: ${({theme}) => theme.colors.dimmed};
    outline: 0;
    background-color: transparent;
    cursor: pointer;

    &:hover {
        outline: 0;
        border-color: ${({theme}) => theme.colors.secondary};
    }

    &:focus {
        outline: 0;
        border-color: ${({theme}) => theme.colors.secondary};
        border-bottom: 2.5px solid;
        color: ${({theme}) => theme.colors.secondary};
    }
`;

const AddButton = styled.button`
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.secondary};
    color: white;
    padding: 0 3.2rem;
    font-size: 16px;
    margin-right: 1.5rem;
`;

const SortButton = styled.button`
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.colors.secondary};
    color: ${({theme}) => theme.colors.secondary};
    font-size: 16px;

    &>*{
        color: gray;
        transform: translate(2px, 3px);
    }
`;

export const Table = () => {
    const basicFilters = ["All Rooms", "Active Employee", "Inactive Employee"];

    return (
        <Container>
            <ControlPanel>
                <section>
                    {basicFilters.map((filter, index) => (
                        <BasicFilter key={`${index}-${filter}`}>{filter}</BasicFilter>
                    ))}
                </section>
                <section>
                    <AddButton>+ New Room</AddButton>
                    <SortButton>
                        Newest <FaChevronDown />
                    </SortButton>
                </section>
            </ControlPanel>
            <Content />
            <Pagination />
        </Container>
    );
};
