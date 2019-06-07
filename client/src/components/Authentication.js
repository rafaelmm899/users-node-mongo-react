export const isAuthenticated = () => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    return (user && token);
}
