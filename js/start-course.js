function startCourse() {
    // Save progress to localStorage
    const progress = JSON.parse(localStorage.getItem("eduverse_progress") || "{}");
    progress["learn-javascript"] = { started: true, lesson: 1, percent: 0 };
    localStorage.setItem("eduverse_progress", JSON.stringify(progress));
 
    // Visual feedback on button
    const btn = document.querySelector(".btn-start");
    btn.textContent = "Continuing...";
    btn.style.opacity = "0.8";
 
    setTimeout(() => {
        btn.textContent = "▶  Continue";
        btn.style.opacity = "1";
    }, 800);
}