import bookingThunk from "../features/bookings/bookingThunk";
import roomThunk from "../features/rooms/roomsThunk";
import userThunk from "../features/users/userThunk";
import { arrayToText } from '../app/utils';

export const statusHeader = 'status'
const tableMap = {
    'Order Date': item => item['orderDate'],
    'Check In': item => item['checkIn'],
    'Check Out': item => item['checkOut'],
    'Special Request': item => arrayToText(item.notes),
    'Room Type': item => item['room'].bedType,

    'Job Desk': item => item.jobDesk,
    'Schedule': item => arrayToText(item.schedule).join(', '),
    'Contact': item => item['contact'],

    'Bed Type': item => `${item.bedType}`,
    'Room Floor': item => item.roomFloor,
    'Facilities': item => arrayToText(item.facilities).join(', '),
    'Rate': item => `${item['rate']} /night`,

    'Status': item => item[statusHeader],
}

export const commonHeaders = ['Status', ''];

export const getCategoryItem = headers => {
    const header = headers[0];
    const category = header.split(' ')[0];

    if (category == 'Name')
        return 'Employee'
    return category;
}
export const categoriesEnum = { Booking: 'Booking', Users: 'Users', Rooms: 'Rooms' };
export const categories = [
    { category: categoriesEnum.Users, item: 'Employee', thunk: userThunk, nameToSearch: 'name' },
    { category: categoriesEnum.Booking, item: 'Guest', thunk: bookingThunk, nameToSearch: 'guest' },
    { category: categoriesEnum.Rooms, item: 'Room', thunk: roomThunk, nameToSearch: 'roomType' }
];

const getCategorySlot = category => categories.find(cat => cat.category === category);

export const getCategory = headers => {
    const item = getCategoryItem(headers);

    const categoryMatch = categories.find(cat => cat.item === item);

    return categoryMatch ? categoryMatch.category : null;
}
export const getThunk = category => {
    const thunk = getCategorySlot(category).thunk;
    return thunk;
}

export const getDisplayName = data => {
    if(data.guest) return data.guest;
    if(data.bedType) return `${data.bedType} - ${data.number}`;
    if(data.name) return data.name;
    return data;
}

export const getStatusOption = data => [...new Set(data.map(item => item.status))];
export const statusColors = {
    Users: {
        "Active": "#5AD07A",
        'Inactive': '#E23428',
    },
    Rooms: {
        'Available': '#5AD07A',
        'Booked': '#E23428',
    },
    Booking: {
        'Booked': '#5AD07A',
        'Refund': '#E23428',
        'Pending': '#E2E2E2',
        'Cancelled': '#575757'
    }
}

export const getNameToSearch = headers => { 
    const category = getCategory(headers);
    return getCategorySlot(category).nameToSearch 
};

export const itemInThisFilter = (activeFilter, categoryItem, item) => {
    if (activeFilter.startsWith('All'))
        return true;
    if (activeFilter.startsWith('Active'))
        return item.status === 'Available' || item.status === 'Active';
    if (activeFilter.startsWith('Inactive'))
        return item.status === 'Booked' || item.status === 'Inactive';
    return item.status === activeFilter.replace(` ${categoryItem}`, '');
}

export const getStringData = (header, item) => {
    const getValue = tableMap[header] || (() => '');
    return getValue(item);
};
