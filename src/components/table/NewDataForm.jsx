/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import Select from 'react-select';
import { useDispatch } from "react-redux";
import { getDisplayName, getThunk } from "../../app/table";
import { showToast, ToastType } from "../../utils/alerts";
import { roomParams, userParams } from '../../app/hotelParams'
import { getCurrentDateTime } from "../../utils/dates";
import { getRandomImageUrl } from "../../utils/random";

const Container = styled.dialog`
    display: block;
    position: fixed;
    background-color: white;
    z-index: 10;
    box-shadow: 0px 0px 400000px 100px black;
    width: 50%;
    height: 50%;
    padding: 1rem;

    &>form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
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
        { label: 'Name', type: 'text', key: 'name', default: 'Paco' },
        { label: 'Password', type: 'password', key: 'password', default: 'password'},
        { label: 'Position', type: 'checkbox', key: 'position', options: userParams.positions, default: userParams.positions[0]},
        { label: 'Email', type: 'email', key: 'email', default: 'some@example.com'},
        { label: 'Contact', type: 'tel', key: 'contact', default: '6xxxxxxxx'},
        { label: '', type: 'auto', key: 'joined', default: getCurrentDateTime()},
        { label: 'Job Desk', type: 'text', key: 'jobDesk', default: userParams.jobDesks[0] },
        { label: 'Schedule', type: 'radio', key: 'schedule', options: userParams.schedules, default: userParams.schedules[0], saveLike:'array' },
    ],
    'Booking': [
        { label: 'Guest', type: 'text', key: 'guest', default: 'Paco' },
        { label: '', type: 'auto', key: 'orderDate', default: getCurrentDateTime()},
        { label: 'Check In', type: 'date', key: 'checkIn', default: getCurrentDateTime() },
        { label: 'Check Out', type: 'date', key: 'checkOut', default: getCurrentDateTime(1) },
        { label: 'Discount', type: 'range', key: 'discount', default: 50 },
        { label: 'Notes', type: 'textarea[]', key: 'notes' },
        { label: 'Room ID', type: 'text', key: 'room', default: 1 }
    ],
    'Rooms': [
        { label: '', type: 'auto', key: 'dateAdded', default: getCurrentDateTime()},
        { label: 'Room Type', type: 'checkbox', key: 'roomType', options: roomParams.types, default: roomParams.types[0] },
        { label: 'Bed Type', type: 'checkbox', key: 'bedType', options: roomParams.bedType, default: roomParams.bedType[0] },
        { label: 'Number', type: 'number', key: 'number', default: 0},
        { label: 'Room Floor', type: 'checkbox', key: 'roomFloor', options: roomParams.floors, default: roomParams.floors[0] },
        { label: 'Facilities', type: 'checkbox', key: 'facilities', options: roomParams.facilities, isMulti: true }, 
        { label: 'Rate', type: 'number', key: 'rate', default: 100 },
        { label: 'Discount', type: 'range', key: 'discount', min:0, max:100, default: 0}
    ]
};

export const NewDataForm = ({ close, category }) => {
    const [status, setStatus] = useState('active');
    const dispatch = useDispatch();

    const categoryFields = formFields[category] || [];

    const initialFormData = categoryFields.reduce((acc, field) => {
        acc[field.key] = field.default !== undefined 
            ? field.default 
            : field.type === 'range' || field.type === 'number'
                ? 0 
                : '';
        return acc;
    }, {});
    

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        setFormData(initialFormData);
    }, [category]);

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = ev => {
        ev.preventDefault();
        if(formData['schedule'] != null) setFormData({...formData, schedule: [formData.schedule]});
        const newData = { ...formData, picture: getRandomImageUrl(), status: status};
        const createTh = getThunk(category).create;
        dispatch(createTh(newData));
        showToast(`Created ${getDisplayName(newData)}`, ToastType.Success);
        close();
    };

    return (
        <Container>
            <CloseButton onClick={close}>X</CloseButton>
            <form onSubmit={handleSubmit}>
                {categoryFields.map((field) => (
                    <div key={field.key}>
                        <label>{field.label}</label>
                        {(field.type === 'text' || field.type === 'password' || field.type === 'tel' || field.type === 'email') && (
                            <input 
                                type={field.type}
                                value={formData[field.key] || field.default}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                            />
                        )}
                        {field.type === 'number' && (
                            <input 
                            type="number"
                            value={formData[field.key] || 0}
                            onChange={(e) => handleInputChange(field.key, e.target.value === "" ? 0 : e.target.value)}
                            />
                        )}
                        {field.type === 'range' && (
                            <div>
                                <input 
                                    type="range"
                                    min={0} max={100}
                                    value={formData[field.key] || 50}
                                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                                />
                                <span>{formData[field.key] || 50}</span>
                            </div>
                        )}
                        {field.type === 'date' && (
                            <input 
                                type="date"
                                value={formData[field.key] || ''}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                                readOnly={field.readOnly}
                            />
                        )}
                        {field.type === 'textarea' && (
                            <textarea
                                value={formData[field.key] || ''}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                            />
                        )}
                        {field.type === 'textarea[]' && (
                            <textarea
                                value={Array.isArray(formData[field.key]) ? formData[field.key].join('\n') : ''}
                                onChange={(e) => handleInputChange(field.key, e.target.value.split('\n'))}
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
                                isMulti={field.isMulti}
                                name={field.key}
                                options={field.options.map(option => ({ value: option, label: option }))}
                                value={
                                    field.isMulti
                                        ? (formData[field.key] || []).map(option => ({ value: option, label: option }))
                                        : formData[field.key]
                                        ? { value: formData[field.key], label: formData[field.key] }
                                        : null
                                }
                                onChange={(selectedOptions) => {
                                    const selectedValues = field.isMulti
                                        ? selectedOptions
                                            ? selectedOptions.map(option => option.value)
                                            : []
                                        : selectedOptions
                                        ? selectedOptions.value
                                        : null;
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

