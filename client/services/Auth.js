export const saveToken = (access, refresh) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
};

export const getToken = () => {
    return localStorage.getItem('access_token');
};

export const removeToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}