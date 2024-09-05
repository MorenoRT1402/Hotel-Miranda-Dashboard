export const getCategoryItem = headers =>{
    const header = headers[0];
    const category = header.split(' ')[0];

    if(category == 'Name')
        return 'Employee'
    return category;
}

export const getStatusOption = data => [...new Set(data.map(item => item.status))];