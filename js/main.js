
/* =========================================
   6. function show / hide password
========================================= */
function togglePass(inputId, iconElement) {
    const passwordInput = document.getElementById(inputId);
    if (!passwordInput) return;

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        iconElement.classList.replace("ri-eye-off-line", "ri-eye-line");
    } else {
        passwordInput.type = "password";
        iconElement.classList.replace("ri-eye-line", "ri-eye-off-line");
    }
}

/* =========================================
   7. animation smooth page transition
========================================= */
document.addEventListener("DOMContentLoaded", () => {
    loadProfile();

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");
            if (href && href.includes(".html") && !href.startsWith("http")) {
                e.preventDefault();
                document.body.style.opacity = "0";
                document.body.style.transition = "0.2s";
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            }
        });
    });
});

/* =========================================
   SIMPLE COURSE SYSTEM
========================================= */
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function getCourses() {
    return JSON.parse(localStorage.getItem("courses")) || [];
}

function saveCourses(courses) {
    localStorage.setItem("courses", JSON.stringify(courses));
}

function getEnrolled() {
    const user = getCurrentUser();
    if (!user) return [];
    return JSON.parse(localStorage.getItem(`enrolled_${user.username}`)) || [];
}

function saveEnrolled(data) {
    const user = getCurrentUser();
    if (!user) return;
    localStorage.setItem(`enrolled_${user.username}`, JSON.stringify(data));
}

(function initCourses() {
    if (!localStorage.getItem("courses")) {
        const sample = [
            { id: 1, title: "HTML Basics", category: "Frontend", desc: "Learn HTML from zero" },
            { id: 2, title: "CSS Mastery", category: "Frontend", desc: "Flexbox & Grid" },
            { id: 3, title: "JavaScript Basics", category: "Frontend", desc: "Core JS concepts" },
            { id: 4, title: "Node.js Intro", category: "Backend", desc: "Server side basics" },
            { id: 5, title: "UI/UX Design", category: "Design", desc: "Design principles" }
        ];
        saveCourses(sample);
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const user = getCurrentUser();
    if (user && document.querySelector("#home-loggedin")) {
        const nameSpan = document.querySelector("#home-loggedin h2 span");
        if (nameSpan) nameSpan.innerText = user.firstName || user.username;
        renderCourses();
        renderEnrolled();
        renderTags();
    }
});

let selectedTag = "All";

function renderCourses() {
    const grid = document.getElementById("rec-grid");
    if (!grid) return;

    const courses = getCourses();
    const filtered = selectedTag === "All" ? courses : courses.filter(c => c.category === selectedTag);

    grid.innerHTML = filtered.map(course => `
        <div class="rec-card glass">
            <h3>${course.title}</h3>
            <p>${course.desc}</p>
            <small>${course.category}</small>
            <button class="btn btn-primary" onclick="enrollCourse(${course.id})">Enroll</button>
        </div>
    `).join("");
}

function enrollCourse(id) {
    const courses = getCourses();
    const course = courses.find(c => c.id === id);
    if (!course) return;

    let enrolled = getEnrolled();
    if (enrolled.some(c => c.id === id)) {
        alert("You are already enrolled!");
        return;
    }

    enrolled.push(course);
    saveEnrolled(enrolled);
    renderEnrolled();
}

function renderEnrolled() {
    const section = document.getElementById("enrolled-section");
    if (!section) return;

    const enrolled = getEnrolled();
    if (enrolled.length === 0) {
        section.innerHTML = `<p style="color:var(--text-muted)">No courses enrolled yet</p>`;
        return;
    }

    section.innerHTML = enrolled.map(course => `
        <div class="enrolled-card glass">
            <h3>${course.title}</h3>
            <p>${course.desc}</p>
        </div>
    `).join("");
}

function renderTags() {
    const tagRow = document.getElementById("tag-row");
    if (!tagRow) return;

    const tags = ["All", "Frontend", "Backend", "Design"];
    tagRow.innerHTML = tags.map(tag => `
        <span class="lang-tag ${selectedTag === tag ? 'active' : ''}" onclick="filterTag('${tag}')">
            ${tag}
        </span>
    `).join("");
}

function filterTag(tag) {
    selectedTag = tag;
    renderCourses();
    renderTags();
}
