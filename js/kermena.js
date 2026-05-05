function toggleTheme() {
    const html = document.documentElement;
    const btn = document.getElementById('themeBtn');
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        btn.textContent = 'light';
    } else {
        html.setAttribute('data-theme', 'dark');
        btn.textContent = 'dark';
    }
}

function saveData() {
    const data = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,

    };

    const existing = JSON.parse(localStorage.getItem('enrollments') || '[]');
    existing.push(data);
    localStorage.setItem('enrollments', JSON.stringify(existing));
}