// const imageInput = document.querySelectorAll('.course-picture-input');
// const imageLabel = document.querySelectorAll('.add-course-picture');
// const videoInput = document.getElementById('.add-lesson-video');
// const videoLabel = document.getElementById('.upload-lesson-video-label');
// imageInput.forEach((value) => {
//     value.addEventListener('change', function() {
//         if (imageInput.files.length > 0) {
//             const selectedImage = imageInput.files[0];
//             const imageUrl = URL.createObjectURL(selectedImage);
//             imageLabel.innerHTML = `<img src="${imageUrl}" alt="Upload picture" id="uploaded-course-picture">`;
//         }
//     });
// })
//
// changeInput

// videoInput.addEventListener('change', function() {
//     if (videoInput.files.length > 0) {
//         const selectedVideo = videoInput.files[0];
//         const videoUrl = URL.createObjectURL(selectedVideo);
//         videoLabel.innerHTML = `<video src="${videoUrl}"  id="uploaded-lesson-video">`;
//     }
// });
function showCourseInfo(index) {
    document.querySelectorAll(".course-info").forEach((value) => {
        if (value.classList.contains("active")) {
            value.classList.remove("active");
        }
    });
    document.querySelectorAll(".create-course-nav").forEach((value) => {
        if (value.classList.contains("active")) {
            value.classList.remove("active");
        }
    });
    document.querySelectorAll(".create-course-nav")[index - 1].classList.add("active");
    if (index === 3) {
        document.querySelector(".right-side-image").classList.add("active");
    } else {
        document.querySelector(".right-side-image").classList.remove("active");
    }
    document.querySelector(`#course-info-${index}`).classList.add("active");
}
showCourseInfo(2);
function showModule(index) {
    let module_nav_tabs = document.querySelectorAll(".module-nav-tab");
    let modules = document.querySelectorAll(".module-container");
    module_nav_tabs.forEach((value) => {
        if (value.classList.contains("active")) {
            value.classList.remove("active");
        }
    });
    modules.forEach((value) => {
        if (value.classList.contains("active")) {
            value.classList.remove("active");
        }
    });
    if (index > 0) {
        module_nav_tabs[index - 1].classList.add("active");
        modules[index-1].classList.add("active");
    } else {
        let newTab = document.createElement("button");
        newTab.classList.add("nav-tab");
        newTab.classList.add("module-nav-tab");
        newTab.setAttribute("onclick", `showModule(${module_nav_tabs.length + 1})`);
        newTab.innerHTML = `${module_nav_tabs.length + 1}`;
        document.querySelectorAll(".modules-navigation")[0].appendChild(newTab);
        let newModule = document.createElement("div");
        newModule.classList.add("constructor-container");
        newModule.classList.add("module-container");
        newModule.innerHTML = `<h2>Модуль исеме</h2>
                        <input type="text" id="module-name-input-${modules.length + 1}">
                        <h2>Модуль тасвирлау</h2>
                        <textarea type="text" id="module-description-input-${modules.length + 1}"></textarea>
                        <h2>Модуль рәсеме</h2>
                        <label for="add-course-picture" class="add-course-picture" id="upload-module-picture-label-${modules.length + 1}">
                            <img src="./images/upload-course-picture.svg" alt="Upload picture" id="upload-module-picture-${modules.length + 1}">
                            <h2>Файлны күчерегез яки сайлар өчен монда басыгыз</h2>
                            <input type="file" id="module-course-picture-${modules.length + 1}" accept="image/*">
                        </label>`
        document.querySelectorAll(".course-main")[1].appendChild(newModule);
        showModule(module_nav_tabs.length + 1);
    }
}
showModule(1);
function showLesson(index) {
    let module_nav_tabs = document.querySelectorAll(".lesson-nav-tab");
    let modules = document.querySelectorAll(".lesson-container");
    module_nav_tabs.forEach((value) => {
        if (value.classList.contains("active")) {
            value.classList.remove("active");
        }
    });
    modules.forEach((value) => {
        if (value.classList.contains("active")) {
            value.classList.remove("active");
        }
    });
    if (index > 0) {
        module_nav_tabs[index - 1].classList.add("active");
        modules[index-1].classList.add("active");
    } else {
        let newTab = document.createElement("button");
        newTab.classList.add("nav-tab");
        newTab.classList.add("lesson-nav-tab");
        newTab.setAttribute("onclick", `showLesson(${module_nav_tabs.length + 1})`);
        newTab.innerHTML = `${module_nav_tabs.length + 1}`;
        document.querySelectorAll(".modules-navigation")[1].appendChild(newTab);
        let newModule = document.createElement("div");
        newModule.classList.add("constructor-container");
        newModule.classList.add("lesson-container");
        newModule.innerHTML = `<div class="lesson-row-1">
                            <div class="choose-module-name">
                                <h2>Модуль исеме</h2>
                                <select class="choose-module-name-select">
                                    <option value="option1">Модуль 1</option>
                                    <option value="option2">Модуль 2</option>
                                    <option value="option3">Модуль 3</option>
                                </select>
                            </div>
                            <div class="choose-lesson-difficulty">
                                <h2>Сложность</h2>
                                <div class="difficulty-stick"></div>
                                <div class="difficulty-scale">
                                    <button class="difficulty" onclick="chooseDifficulty(${modules.length}, 0)">1</button>
                                    <button class="difficulty" onclick="chooseDifficulty(${modules.length}, 1)">2</button>
                                    <button class="difficulty" onclick="chooseDifficulty(${modules.length}, 2)">3</button>
                                    <button class="difficulty" onclick="chooseDifficulty(${modules.length}, 3)">4</button>
                                    <button class="difficulty" onclick="chooseDifficulty(${modules.length}, 4)">5</button>
                                </div>
                            </div>
                        </div>
                        <div class="lesson-row-2">
                            <div class="lesson-name">
                                <h2>Дәрес исеме</h2>
                                <input type="text" class="lesson-name-input">
                            </div>
                            <div class="lesson-time">
                                <h2>Длительность (в мин)</h2>
                                <input type="text" class="lesson-time-input">
                            </div>
                        </div>
                        <div class="lesson-row-3">
                            <div class="lesson-description">
                                <h2>Дәрес исеме</h2>
                                <textarea class="lesson-description-textarea"></textarea>
                            </div>
                            <div class="lesson-video">
                                <h2>Видео</h2>
                                <label for="add-course-picture" class="add-lesson-video">
                                    <img src="./images/video-upload.svg" alt="Upload picture" class="upload-lesson-video">
                                    <h2>Файлны күчерегез яки сайлар өчен монда басыгыз</h2>
                                    <input type="file" class="add-lesson-video" accept="video/*">
                                </label>
                            </div>
                        </div>
                        <div class="lesson-row-4">
                            <h2>Текст</h2>
                            <textarea class="lesson-text"></textarea>
                        </div>`
        document.querySelectorAll(".course-main")[2].appendChild(newModule);
        showLesson(module_nav_tabs.length + 1);
    }
}
showLesson(1);
function chooseDifficulty(lessonNum, diff) {
    let difficulty = document.querySelectorAll(".difficulty");
    for (let i = lessonNum * 5; i < lessonNum * 5 + 5; i++) {
        if (difficulty[i].classList.contains("active")) {
            difficulty[i].classList.remove("active");
        }
    }
    difficulty[lessonNum * 5 + diff].classList.add("active");
}
function showQuiz(index) {
    let module_nav_tabs = document.querySelectorAll(".quiz-nav-tab");
    let modules = document.querySelectorAll(".quiz-container");
    module_nav_tabs.forEach((value) => {
        if (value.classList.contains("active")) {
            value.classList.remove("active");
        }
    });
    modules.forEach((value) => {
        if (value.classList.contains("active")) {
            value.classList.remove("active");
        }
    });
    if (index > 0) {
        module_nav_tabs[index - 1].classList.add("active");
        modules[index-1].classList.add("active");
    } else {
        let newTab = document.createElement("button");
        newTab.classList.add("nav-tab");
        newTab.classList.add("quiz-nav-tab");
        newTab.setAttribute("onclick", `showQuiz(${module_nav_tabs.length + 1})`);
        newTab.innerHTML = `${module_nav_tabs.length + 1}`;
        document.querySelectorAll(".modules-navigation")[2].appendChild(newTab);
        let newModule = document.createElement("div");
        newModule.classList.add("constructor-container");
        newModule.classList.add("quiz-container");
        newModule.innerHTML = `<h2>Бирем тип</h2>
                        <select id="choose-quiz-type">
                            <option value="option1">Ачык сорау</option>
                            <option value="option2">Ачык сорау</option>
                            <option value="option3">Ачык сорау</option>
                        </select>
                        <h2>Сорау</h2>
                        <textarea id="quiz-question-input-${modules.length + 1}"></textarea>
                        <h2>Дөрес җавап рәсеме</h2>
                        <textarea id="quiz-answer-input-${modules.length + 1}"></textarea>`
            document.querySelectorAll(".course-main")[3].appendChild(newModule);
        showQuiz(module_nav_tabs.length + 1);
    }
}
showQuiz(1);
