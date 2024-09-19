import { createThunk as createUser } from "../features/users/userThunk";
import { createThunk as createBooking } from "../features/bookings/bookingThunk";
import { createThunk as createRoom } from "../features/rooms/roomsThunk";

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

    'Status': item => item['status'],
}

export const getCategoryItem = headers =>{
    const header = headers[0];
    const category = header.split(' ')[0];

    if(category == 'Name')
        return 'Employee'
    return category;
}
export const categories = [
    { category: 'Users', item: 'Employee', create: createUser },
    { category: 'Booking', item: 'Guest', create: createBooking },
    { category: 'Rooms', item: 'Room', create: createRoom }
];

const getCategorySlot = category => categories.find(cat => cat.category === category);

export const getCategory = headers => {
    const item = getCategoryItem(headers);

    const categoryMatch = categories.find(cat => cat.item === item);

    return categoryMatch ? categoryMatch.category : null;
}

export const getCreate = category => getCategorySlot(category).create;

export const getStatusOption = data => [...new Set(data.map(item => item.status))];

export const getStringData = (header, item) => {
    const getValue = tableMap[header] || (() => '');
    return getValue(item);
};
