/* eslint-disable react/prop-types */
import { useState } from "react";
import styled from "styled-components";
import Select from 'react-select';
import { getCreate } from "../../app/table";
import { useDispatch } from "react-redux";

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

const formFields = {
    'Users': [
        { label: 'Name', type: 'text', key: 'name' },
        { label: 'Job Desk', type: 'text', key: 'jobDesk' },
        { label: 'Schedule', type: 'radio', key: 'schedule', options: ['Monday, Friday', 'Saturday, Sunday', 'Wednesday, Sunday'] },
        { label: 'Contact', type: 'text', key: 'contact' }
    ],
    'Booking': [
        { label: 'Guest', type: 'text', key: 'guest' },
        { label: 'Check In', type: 'date', key: 'checkIn' },
        { label: 'Check Out', type: 'date', key: 'checkOut' },
        { label: 'Notes', type: 'textarea', key: 'notes' },
        { label: 'Room ID', type: 'number', key: 'roomId' }
    ],
    'Rooms': [
        { label: 'Room Type', type: 'checkbox', key: 'roomType', options: ['Single', 'Double', 'Suite'] },
        { label: 'Name', type: 'text', key: 'name' },
        { label: 'Bed Type', type: 'checkbox', key: 'bedType', options: ['King', 'Queen', 'Double'] },
        { label: 'Room Floor', type: 'checkbox', key: 'roomFloor', options: ['1', '2', '3'] },
        { label: 'Facilities', type: 'text', key: 'facilities' }, 
        { label: 'Rate', type: 'number', key: 'rate' }
    ]
};

export const NewDataForm = ({ close, data, category }) => {
    const [formData, setFormData] = useState({});
    const [status, setStatus] = useState('active');
    const dispatch = useDispatch();

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = ev => {
        ev.preventDefault();
        const newData = { ...formData, id: data[data.length - 1].id + 1, picture: '', status: status};
        const createTh = getCreate(category);
        dispatch(createTh(newData));
        close();
    };

    const categoryFields = formFields[category] || [];

    return (
        <Container>
            <CloseButton onClick={close}>X</CloseButton>
            <form onSubmit={handleSubmit}>
                {categoryFields.map((field) => (
                    <div key={field.key}>
                        <label>{field.label}</label>
                        {field.type === 'text' && (
                            <input 
                                type={field.type}
                                value={formData[field.key] || ''}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                            />
                        )}
                        {field.type === 'number' && (
                            <input 
                                type="number"
                                value={formData[field.key] || ''}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                            />
                        )}
                        {field.type === 'date' && (
                            <input 
                                type="date"
                                value={formData[field.key] || ''}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                            />
                        )}
                        {field.type === 'textarea' && (
                            <textarea
                                value={formData[field.key] || ''}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                            />
                        )}
                        {field.type === 'radio' && (
                            <div>
                                {field.options.map((option) => (
                                    <label key={option}>
                                        <input 
                                            type="radio"
                                            name={field.key}
                                            value={option}
                                            checked={formData[field.key] === option}
                                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                        {field.type === 'checkbox' && (
                            <Select
                                isMulti
                                name={field.key}
                                options={field.options.map(option => ({ value: option, label: option }))}
                                value={(formData[field.key] || []).map(option => ({ value: option, label: option }))}
                                onChange={(selectedOptions) => {
                                    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                    handleInputChange(field.key, selectedValues);
                                }}
                                styles={{
                                    container: (base) => ({ ...base, minWidth: '200px' }),
                                    control: (base) => ({ ...base, borderRadius: '4px', padding: '0.4rem' }),
                                }}
                            />
                        )}                
                    </div>
                    ))}
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

