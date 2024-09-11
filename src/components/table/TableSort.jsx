import { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const SortButton = styled(Select)`

    &>*{
        border-color: ${({theme}) => theme.colors.secondary} !important;
        border-radius: 10px !important;
        color: ${({theme}) => theme.colors.secondary};
    }
`;

const sortOptions = [
    { value: 'guest', label: 'Guest (Alphabetical)' },
    { value: 'orderDate', label: 'Order Date (Default)' },
    { value: 'checkIn', label: 'Check In Date' },
    { value: 'checkOut', label: 'Check Out Date' },
];

// eslint-disable-next-line react/prop-types
export const TableSort = ({filteredData, setSortedData}) => {
    const [sortOption, setSortOption] = useState(sortOptions[1]);

    useEffect(() => {
        const sorted = [...filteredData].sort((a, b) => {
          switch (sortOption.value) {
            case 'guest':
              return a.guest.localeCompare(b.guest);
            case 'orderDate':
              return new Date(a.orderDate) - new Date(b.orderDate);
            case 'checkIn':
              return new Date(a.checkIn) - new Date(b.checkIn);
            case 'checkOut':
              return new Date(a.checkOut) - new Date(b.checkOut);
            default:
              return 0;
          }
        });
        setSortedData(sorted);
      }, [filteredData, sortOption, setSortedData]);

    return (
        <SortButton
        value={sortOption}
        onChange={value => setSortOption(value)}
        options={sortOptions}
        isSearchable={false}
        styles={{
          container: (base) => ({ ...base, minWidth: '200px' }),
          control: (base) => ({ ...base, borderRadius: '4px', padding: '0.4rem' }),
        }}
      />
    )
}