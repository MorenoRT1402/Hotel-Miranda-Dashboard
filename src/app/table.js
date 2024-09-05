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

    'Bed Type': item => `${item['bed-type']} Bed`,
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

export const getStatusOption = data => [...new Set(data.map(item => item.status))];

// export const getStringData = (item, colIndex) => {
//     const dataMapping = {
//         1: () => item['job-desk'] || item['orderDate'] || `${item['bed-type']} Bed`,
//         2: () => item['checkIn'] || item['schedule'].join(', ') || `Room ${item['room-floor']}`,
//         3: () => item['checkOut'] || item['contact'] || item['facilities'].join(', '),
//         4: () => item['notes'] || `${item['rate']} /night` || item['status'],
//         5: () => item['roomId'] || item['status'],
//         6: () => item['status']
//     };

//     return (dataMapping[colIndex] || (() => ''))();
// };

export const getStringData = (header, item) => {
    const getValue = tableMap[header] || (() => '');
    return getValue(item);
};
