export const getCurrentDateTime = (add=0) => {
    const date = new Date();
    date.setDate(date.getDate() + add);
    return date.toISOString().slice(0, 19);
};

export const formatDateTime = (date: Date | string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};
