const tokenKey = 'hmtk'
export const saveToken = (token:string) => localStorage.setItem(tokenKey, token);

export const getToken = () => localStorage.getItem(tokenKey);

export const deleteToken = () => localStorage.removeItem(tokenKey);
