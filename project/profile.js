// /* ================= PROFILE ================= */
// function loadProfile() {
//     const user = JSON.parse(localStorage.getItem("currentUser"));
//     if (!user) return;

//     document.getElementById("firstName").value = user.firstName || "";
//     document.getElementById("lastName").value = user.lastName || "";
//     document.getElementById("userName").value = user.username || "";
//     document.getElementById("email").value = user.email || "";
//     document.getElementById("password").value = user.password || "";

//     document.getElementById("fullName").innerText =
//         (user.firstName || "") + " " + (user.lastName || "");

//     document.getElementById("username").innerText = user.username || "";
//     document.getElementById("emailView").innerText = user.email || "";
// }

// function saveProfile() {
//     const user = {
//         firstName: document.getElementById("firstName").value,
//         lastName: document.getElementById("lastName").value,
//         username: document.getElementById("userName").value,
//         email: document.getElementById("email").value,
//         password: document.getElementById("password").value
//     };

//     localStorage.setItem("currentUser", JSON.stringify(user));
//     loadProfile();
//     alert("Profile Updated ✅");
// }

