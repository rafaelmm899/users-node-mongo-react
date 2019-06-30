export const userService = {
    login,
    isAuthenticated,
    logout
};

function login(email, password) {
    return fetch("http://localhost:3789/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.json())
        .then(response => {
            if (response.user) {
                localStorage.setItem("user", JSON.stringify(response.user));
                localStorage.setItem("token", response.token);
            }
            return response;
        });
}

function isAuthenticated() {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    return user && token;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}
