const user = JSON.parse(localStorage.getItem("eduverse_user")) || {
    name: "Alex Johnson",
    avatar: "imgs/pp.jpg"
};
 
document.querySelector(".user-name").textContent = user.name;
document.querySelector(".user-avatar").src = user.avatar;s

function sendWord(theWord) {
    localStorage.setItem('selectedCategory', theWord);
    window.location.href = 'receiver.html'; 
}


function displayWord() {
    const target = document.getElementById('display-area');
    if (target) {
        const word = localStorage.getItem('selectedCategory');
        if (word) {
            target.textContent = word;
        }
    }
}


window.onload = displayWord;

const btn = document.getElementById('myButton');

btn.addEventListener('click', () => {
    window.location.href = 'start-course.html';
});