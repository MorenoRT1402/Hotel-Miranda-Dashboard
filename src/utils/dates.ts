export const getCurrentDateTime = (add=0) => {
    const date = new Date();
    date.setDate(date.getDate() + add);
    return date.toISOString().split('T')[0];
};

export const formatDateTime = (date: Date | string) => {
    if (!date) {
        console.error("Invalid date value provided:", date);
        return "Invalid date";
    }

    const parsedDate = new Date(date);
    
    if (isNaN(parsedDate.getTime())) {
        console.error("Invalid date format:", date);
        return "Invalid date";
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };
    
    return new Intl.DateTimeFormat('en-US', options).format(parsedDate);
};

