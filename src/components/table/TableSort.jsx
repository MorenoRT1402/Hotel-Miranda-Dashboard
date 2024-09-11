import { useEffect, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import { sortData, sortOptionsByCategory } from '../../utils/sort';

const SortButton = styled(Select)`
    &>* {
        border-color: ${({ theme }) => theme.colors.secondary} !important;
        border-radius: 10px !important;
        color: ${({ theme }) => theme.colors.secondary};
    }
`;

// eslint-disable-next-line react/prop-types
export const TableSort = ({ category, filteredData, setSortedData }) => {
    const sortOptions = sortOptionsByCategory[category] || [];
    const [sortOption, setSortOption] = useState(sortOptions[0]);

    useEffect(() => {
        const sorted = sortData(filteredData, sortOption);
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
    );
};
