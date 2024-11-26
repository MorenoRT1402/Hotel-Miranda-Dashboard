export const delay = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));
export const getFinalPrice = (rate:number, discount:number) => {
    return rate * (1 - discount / 100);
}

//#region Arrays
export const arrayToText = (array:any[]) => {
    try {
        if(Array.isArray(array))
            return array.join(', ')
        return JSON.parse(array);
    } catch {
        return array;
    }
}

export const textToArray = (text: any) => {
    try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        return text.split(',').map((item: string) => item.trim());
    } catch (e) {
        console.error(e);
        return [];
    }
}
//#endregion


//#region DB
type ItemId = { _id?: string; id?: string };

export const getID = (item: ItemId): string | undefined => item._id || item.id;
//#endregion

