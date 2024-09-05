export const getCategoryItem = headers =>{
    const header = headers[0];
    const category = header.split(' ')[0];

    if(category == 'Name')
        return 'Employee'
    return category;
}

export const getStatusOption = data => [...new Set(data.map(item => item.status))];

export const getStringData = (item, colIndex) => {
    const dataMapping = {
        1: () => item['job-desk'] || item['order-date'] || `${item['bed-type']} Bed`,
        2: () => item['check-in'] || item['schedule'] || item['room-floor']
    };

    return (dataMapping[colIndex] || (() => ''))();
};
