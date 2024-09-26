import { createThunk as createUser } from "../features/users/userThunk";
import { createThunk as createBooking } from "../features/bookings/bookingThunk";
import { createRoomThunk as createRoom } from "../features/rooms/roomsThunk";

export const statusHeader = 'status'
const tableMap = {
    'Order Date': item => item['orderDate'],
    'Check In': item => item['checkIn'],
    'Check Out': item => item['checkOut'],
    // 'Special Request': item => item['notes'].join(', '),
    'Special Request': item => item['notes'].join(', '),
    'Room Type': item => item['roomId'],

    'Job Desk': item => item['job-desk'],
    'Schedule': item => item['schedule'].join(', '),
    'Contact': item => item['contact'],

    'Bed Type': item => `${item['bed-type']}`,
    'Room Floor': item => item['room-floor'],
    'Facilities': item => item['facilities'].join(', '),
    'Rate': item => `${item['rate']} /night`,

    'Status': item => item[statusHeader],
}

export const getCategoryItem = headers => {
    const header = headers[0];
    const category = header.split(' ')[0];

    if (category == 'Name')
        return 'Employee'
    return category;
}
export const categoriesEnum = { Booking: 'Booking', Users: 'Users', Rooms: 'Rooms' };
export const categories = [
    { category: categoriesEnum.Users, item: 'Employee', create: createUser, nameToSearch: 'name' },
    { category: categoriesEnum.Booking, item: 'Guest', create: createBooking, nameToSearch: 'guest' },
    { category: categoriesEnum.Rooms, item: 'Room', create: createRoom, nameToSearch: 'room-type' }
];

const getCategorySlot = category => categories.find(cat => cat.category === category);

export const getCategory = headers => {
    const item = getCategoryItem(headers);

    const categoryMatch = categories.find(cat => cat.item === item);

    return categoryMatch ? categoryMatch.category : null;
}

export const getCreate = category => getCategorySlot(category).create;

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
