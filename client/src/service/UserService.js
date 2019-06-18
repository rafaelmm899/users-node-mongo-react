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
        .then(respose => {
            if (respose.user) {
                localStorage.setItem("user", respose.user);
                localStorage.setItem("token", respose.token);
                return respose;
            }
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
