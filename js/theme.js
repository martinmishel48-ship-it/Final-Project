/* switch ben el themes w n-save el choice f el localStorage 3shan may-di3sh */
/* ========= THEME TOGGLE SYSTEM ========= */
/* lama el user ydos 3la el button n8yr ben light / dark */

document.addEventListener("DOMContentLoaded", () => {
    // hna el tarkaya: lazm el ID ykon "ChangeTheme" zay el HTML bta3k bzbt
    const themeBtn = document.getElementById("ChangeTheme");

    if (!themeBtn) return; // safety lw el button msh mwgood

    // bn-msel el icon 3shan n-ghayar el class bta3ha (shams aw 2mar)
    const icon = themeBtn.querySelector("i");

    // 1. check el saved theme awel ma el sf7a t-load 3shan n-zbt shakl el icon
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (icon) {
        if (savedTheme === "light") {
            icon.className = "ri-sun-line"; // lo light, n-5lyha shams
        } else {
            icon.className = "ri-moon-line"; // lo dark, n-5lyha 2mar
        }
    }

    // 2. el listener el wa7ed elly hy-handle el switch
    themeBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");

        if (currentTheme === "light") {
            // n-ghayar l dark
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");

            // n-zbt el icon t-kon 2mar (moon) f el dark
            if (icon) {
                icon.className = "ri-moon-line";
            }
        } else {
            // n-ghayar l light
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");

            // n-zbt el icon t-kon shams (sun) f el light
            if (icon) {
                icon.className = "ri-sun-line";
            }
        }
    });
});

/* ========= LOAD SAVED THEME (Auto-Execute) ========= */
/* de lazm tfzal bra el DOMContentLoaded 3shan t-shtghal 2abl ma el sf7a t-ersem */
(function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }
})();