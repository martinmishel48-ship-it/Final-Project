const user = JSON.parse(localStorage.getItem("eduverse_user")) || {
    name: "Alex Johnson",
    avatar: "imgs/pp.jpg"
};
 
document.querySelector(".user-name").textContent = user.name;
document.querySelector(".user-avatar").src = user.avatar;s