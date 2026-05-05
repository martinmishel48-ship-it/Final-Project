// ================= SAVE PROFILE =================
const updateBtn = document.querySelector('.btn-primary');

updateBtn.addEventListener('click', () => {
    const name = document.querySelectorAll('.form-control')[0].value;
    const handle = document.querySelectorAll('.form-control')[1].value;
    const email = document.querySelectorAll('.form-control')[2].value;
    const bio = document.querySelector('textarea').value;

    const userData = { name, handle, email, bio };

    localStorage.setItem('userProfile', JSON.stringify(userData));

    alert("Profile Updated Successfully 🚀");
    loadProfile();
});

// ================= LOAD PROFILE =================
function loadProfile() {
    const data = JSON.parse(localStorage.getItem('userProfile'));
    if (!data) return;

    document.querySelectorAll('.form-control')[0].value = data.name;
    document.querySelectorAll('.form-control')[1].value = data.handle;
    document.querySelectorAll('.form-control')[2].value = data.email;
    document.querySelector('textarea').value = data.bio;

    document.querySelector('.profile-info h1').innerText = data.name;
}

loadProfile();

// ================= DISCARD =================
document.querySelector('.btn-ghost').addEventListener('click', () => {
    loadProfile();
});

// ================= AVATAR UPLOAD =================
const avatarEdit = document.querySelector('.avatar-edit');

avatarEdit.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function () {
            document.querySelector('.avatar').innerHTML =
                `<img src="${reader.result}"/>`;

            localStorage.setItem('avatar', reader.result);
        };

        reader.readAsDataURL(file);
    };

    input.click();
});

// LOAD SAVED AVATAR
const savedAvatar = localStorage.getItem('avatar');
if (savedAvatar) {
    document.querySelector('.avatar').innerHTML =
        `<img src="${savedAvatar}"/>`;
}

// ================= TOGGLE SAVE =================
const toggle = document.querySelector('.toggle input');

toggle.addEventListener('change', () => {
    localStorage.setItem('2fa', toggle.checked);
});

// LOAD TOGGLE STATE
const savedToggle = localStorage.getItem('2fa');
if (savedToggle !== null) {
    toggle.checked = savedToggle === 'true';
}