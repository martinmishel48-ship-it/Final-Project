/* =========================================
   1. HELPERS (localStorage)
========================================= */
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

/* =========================================
   2. SIGNUP
========================================= */
function signup() {
    const message = document.getElementById("message");

    const userData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        username: document.getElementById("signupUsername").value.trim(),
        email: document.getElementById("universityEmail").value.trim(),
        password: document.getElementById("signupPassword").value
    };

    // validation
    if (Object.values(userData).some(v => v === "")) {
        message.innerText = "Please fill in all fields!";
        message.style.color = "#ff4d4d";
        return;
    }

    let users = getUsers();

    const isDuplicate = users.some(u =>
        u.username === userData.username || u.email === userData.email
    );

    if (isDuplicate) {
        message.innerText = "Username or Email already exists!";
        message.style.color = "#ff4d4d";
        return;
    }

    users.push(userData);
    saveUsers(users);

    localStorage.setItem("currentUser", JSON.stringify(userData));

    message.innerText = "Account created successfully!";
    message.style.color = "#00ff9d";

    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000);
}

/* =========================================
   3. LOGIN
========================================= */
function login() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("message");

    const users = getUsers();

    const user = users.find(u =>
        u.username === username && u.password === password
    );

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));

        message.innerText = "Login successful!";
        message.style.color = "#00ff9d";

        setTimeout(() => {
            window.location.href = "home.html";
        }, 800);
    } else {
        message.innerText = "Invalid username or password!";
        message.style.color = "#ff4d4d";
    }
}

/* =========================================
   4. LOGOUT
========================================= */
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

/* =========================================
   5. LOAD PROFILE (PROFILE PAGE)
========================================= */
function loadProfilePage() {
    const user = getCurrentUser();
    if (!user) return;

    document.getElementById("firstName").value = user.firstName || "";
    document.getElementById("lastName").value = user.lastName || "";
    document.getElementById("userName").value = user.username || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("password").value = user.password || "";

    document.getElementById("fullName").innerText =
        user.firstName + " " + user.lastName;

    document.getElementById("username").innerText = user.username;
    document.getElementById("emailView").innerText = user.email;
}

/* =========================================
   6. SAVE PROFILE
========================================= */
function saveProfile() {
    let user = getCurrentUser();
    if (!user) return;

    user.firstName = document.getElementById("firstName").value;
    user.lastName = document.getElementById("lastName").value;
    user.username = document.getElementById("userName").value;
    user.email = document.getElementById("email").value;
    user.password = document.getElementById("password").value;

    // update current user
    localStorage.setItem("currentUser", JSON.stringify(user));

    // update users list
    let users = getUsers();
    const index = users.findIndex(u => u.email === user.email);
    if (index !== -1) {
        users[index] = user;
        saveUsers(users);
    }

    loadProfilePage();
    alert("Profile Updated ");
}

/* =========================================
   7. DASHBOARD GREETING + PROTECTION
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    const user = getCurrentUser();

    const welcomeSpan = document.querySelector("#home-loggedin h2 span");

    if (user) {
        if (welcomeSpan) {
            welcomeSpan.innerText = user.firstName;
        }

        // load profile لو موجود
        if (document.getElementById("fullName")) {
            loadProfilePage();
        }

    } else {
        // حماية الصفحات
        if (window.location.href.includes("dashboard.html") ||
            window.location.href.includes("profile.html")) {
            window.location.href = "login.html";
        }
    }
});