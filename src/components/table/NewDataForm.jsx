import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createThunk } from "../../features/users/userThunk";

const Container = styled.div`
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: 0px 0px 400000px 100px black;
    width: 50vw;
    height: 50vh;
    padding: 1rem; /* Añadido para mejor espaciado */
`;

const CloseButton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.5rem;
    background: #ccc;
    border: none;
    cursor: pointer;
`;

// eslint-disable-next-line react/prop-types
export const NewDataForm = ({ close }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [jobDesk, setJobDesk] = useState('');
    const [selectedSch, setSelectedSch] = useState('');
    const [contact, setContact] = useState('');
    const [status, setStatus] = useState('active');

    const schedules = ['Monday, Friday', 'Saturday, Sunday', 'Wednesday, Sunday'];

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(createThunk({ name, jobDesk, schedule: selectedSch, contact, status }));
        close();
    };

    return (
        <Container>
            <CloseButton onClick={close}>X</CloseButton>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                />
                <textarea 
                    placeholder="Job desk"
                    value={jobDesk}
                    onChange={(ev) => setJobDesk(ev.target.value)}
                />
                <section>
                    <strong>Schedule</strong>
                    <div>
                        {schedules.map((sch, index) => (
                            <label key={`${index}-${sch}`}>
                                <input 
                                    type="radio"
                                    name="schedule"
                                    value={sch}
                                    checked={selectedSch === sch}
                                    onChange={(ev) => setSelectedSch(ev.target.value)}
                                />
                                {sch}
                            </label>
                        ))}
                    </div>
                </section>
                <input 
                    type="text" 
                    placeholder="Contact"
                    value={contact}
                    onChange={(ev) => setContact(ev.target.value)}
                />
                <select 
                    name="status" 
                    value={status}
                    onChange={(ev) => setStatus(ev.target.value)}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button type="submit">Create</button>
            </form>
        </Container>
    );
};
