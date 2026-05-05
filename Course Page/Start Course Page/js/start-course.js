function startCourse() {
    // 1. Save progress to localStorage
    const progress = JSON.parse(localStorage.getItem("eduverse_progress") || "{}");
    progress["learn-javascript"] = { started: true, lesson: 1, percent: 0 };
    localStorage.setItem("eduverse_progress", JSON.stringify(progress));

    // 2. Visual feedback on button
    const btn = document.querySelector(".btn-start");
    btn.textContent = "Continuing...";
    btn.style.opacity = "0.8";

    // 3. التحويل للصفحة المطلوبة بعد الـ Delay
    setTimeout(() => {
        btn.textContent = "▶  Continue";
        btn.style.opacity = "1";

        // ده السطر اللي كان ناقص عشان يفتح الصفحة
        window.location.href = "../Pages/coursesKero.html";
    }, 800);
}