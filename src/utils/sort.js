export const sortOptionsByCategory = {
    Guest: [
        { value: 'guest', label: 'Guest (Alphabetical)', type: 'text', order: 'asc' },
        { value: 'orderDate', label: 'Newest', type: 'date', order: 'desc' },
        { value: 'checkIn', label: 'Check In Date', type: 'date', order: 'desc' },
        { value: 'checkOut', label: 'Check Out Date', type: 'date', order: 'desc' },
    ],
    Employee: [
        { value: 'joined', label: 'Newest', type: 'date', order: 'desc' },
        { value: 'name', label: 'Name', type: 'text', order: 'asc' },
    ],
};

export const sortData = (data, sortOption) => {
    return [...data].sort((a, b) => {
        const { type, order, value } = sortOption;

        if (type === 'text') {
            return order === 'asc'
                ? a[value].localeCompare(b[value])
                : b[value].localeCompare(a[value]);
        }

        if (type === 'date') {
            return order === 'asc'
                ? new Date(a[value]) - new Date(b[value])
                : new Date(b[value]) - new Date(a[value]);
        }

        return 0;
    });
};
