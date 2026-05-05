document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname.split('/').pop();

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        }
    });
});
const courseData = {
    html: {
        name: 'HTML Fundamentals',
        desc: 'Structure the web with semantic HTML5.',
        recommended: [
            { name: 'CSS & Styling', tag: 'Web dev', desc: 'Master layouts, flexbox, grid, animations, and modern CSS techniques.' },
            { name: 'JavaScript Basics', tag: 'Web dev', desc: 'Bring your web pages to life with interactive JavaScript programming.' },
            { name: 'Responsive Design', tag: 'Web dev', desc: 'Build websites that look great on any screen size or device.' },
        ]
    },
    python: {
        name: 'Python Essentials',
        desc: 'Write clean, powerful Python from day one.',
        recommended: [
            { name: 'Django Web Framework', tag: 'Python', desc: 'Build full-stack web applications rapidly using the Django framework.' },
            { name: 'Data Science with Pandas', tag: 'Python', desc: 'Analyse, visualise, and draw insights from real-world datasets.' },
            { name: 'Machine Learning Basics', tag: 'Python', desc: 'Understand and implement your first ML models using scikit-learn.' },
        ]
    },
    c: {
        name: 'C Programming',
        desc: 'Understand memory, pointers, and low-level computing.',
        recommended: [
            { name: 'C++ Fundamentals', tag: 'Systems', desc: 'Extend your C knowledge into object-oriented programming with C++.' },
            { name: 'Python for C Programmers', tag: 'General', desc: 'Leverage your systems knowledge to write fast, expressive Python.' },
            { name: 'Data Structures & Algorithms', tag: 'CS core', desc: 'Implement and analyse the core algorithms every developer must know.' },
        ]
    }
};

let currentCourse = 'html';

function simulateLogin() {
    document.getElementById('nav-loggedout').style.display = 'none';
    document.getElementById('nav-loggedin').style.display = 'flex';
    document.getElementById('home-loggedout').style.display = 'none';
    document.getElementById('home-loggedin').style.display = 'block';
    renderDashboard();
}

function simulateLogout() {
    document.getElementById('nav-loggedout').style.display = 'flex';
    document.getElementById('nav-loggedin').style.display = 'none';
    document.getElementById('home-loggedout').style.display = 'block';
    document.getElementById('home-loggedin').style.display = 'none';
}

function renderDashboard() {
    const data = courseData[currentCourse];

    document.getElementById('enrolled-section').innerHTML = `
  <div class="enrolled-card glass">
      <div class="enrolled-info">
      <div class="course-icon"></div>
       <h3>${data.name}</h3>
       <p>${data.desc}</p>
      </div>
      <button class="btn btn-primary" style="margin-left:auto">Continue learning →</button>
    </div>`;

    document.getElementById('tag-row').innerHTML = Object.entries(courseData).map(([key, val]) =>
        `<span class="lang-tag ${key === currentCourse ? 'active' : ''}" onclick="switchCourse('${key}')">${val.name}</span>`
    ).join('');

    document.getElementById('rec-grid').innerHTML = data.recommended.map(r => `
    <div class="rec-card glass">
      <span class="rec-tag">${r.tag}</span>
       <h4> ${r.name}</h4>
      <p>${r.desc}</p>
      <a class="enroll-link" href="#">Enroll now →</a>
    </div>`).join('');
}

function switchCourse(key) {
    currentCourse = key;
    renderDashboard();
}
function validateField(id, condition) {
    const field = document.getElementById('field-' + id);
    if (!field) return condition;
    if (!condition) { field.classList.add('has-error'); return false; }
    field.classList.remove('has-error');
    return true;
}

function handleSubmit() {
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const allOk = [
        validateField('fname', fname.length > 0),
        validateField('lname', lname.length > 0),
        validateField('email', emailOk),
        validateField('message', message.length > 0),
    ].every(Boolean);

    if (!allOk) return;

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
        btn.textContent = 'Sent ✓';
        document.getElementById('successBanner').style.display = 'block';
        ['fname', 'lname', 'email', 'message'].forEach(id => document.getElementById(id).value = '');
        document.getElementById('topic').value = '';
    }, 1000);
}