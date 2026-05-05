let currentId = 'kUMe1FH4CHE';

/**
 * وظيفة تغيير الفيديو وبيانات الدرس
 */
function changeLesson(id, title, meta, el) {
    currentId = id;
    document.getElementById('mainTitle').innerText = title;
    document.getElementById('lessonMeta').innerText = `🕒 ${meta}`;
    
    // تحديث الشكل النشط في القائمة الجانبية
    document.querySelectorAll('.lesson-row').forEach(r => r.classList.remove('active'));
    el.classList.add('active');

    // إعادة ضبط مشغل الفيديو
    const cover = document.getElementById('videoCover');
    const iframe = document.getElementById('videoIframe');
    iframe.src = "";
    cover.style.display = 'flex';
    cover.style.backgroundImage = `url('https://img.youtube.com/vi/${id}/maxresdefault.jpg')`;
}

/**
 * وظيفة تشغيل الفيديو عند الضغط على Play
 */
function startVideo() {
    const cover = document.getElementById('videoCover');
    const iframe = document.getElementById('videoIframe');
    iframe.src = `https://www.youtube.com/embed/${currentId}?autoplay=1`;
    cover.style.display = 'none';
}

/**
 * وظيفة التبديل بين التبويبات (Overview / Resources)
 */
function switchTab(type, event) {
    const content = document.getElementById('tabContent');
    
    if(type === 'res') {
        content.innerHTML = `
            <h4 style="margin-bottom:10px">Learning Materials:</h4>
            <ul style="color: var(--text-dim); margin-left: 20px; line-height: 2;">
                <li><a href="https://www.w3schools.com/html/" target="_blank" style="color:var(--accent-green)">W3Schools HTML Documentation</a></li>
                <li><a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" style="color:var(--accent-green)">MDN Web Docs</a></li>
            </ul>`;
    } else {
        content.innerHTML = `
            <p style="color: var(--text-dim); line-height: 1.6;">
                In this lesson, you will learn the core foundations of Web Development. We'll start by understanding how HTML structures the web.
            </p>`;
    }

    // تحديث حالة الزر النشط
    document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
    event.currentTarget.classList.add('active');
}