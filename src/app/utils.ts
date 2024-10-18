export const delay = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));
export const getFinalPrice = (rate:number, discount:number) => {
    return rate * (1 - discount / 100);
}
