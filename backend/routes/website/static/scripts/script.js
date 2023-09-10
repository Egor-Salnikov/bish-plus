function showTab(tabIndex) {
    const tabContents = document.querySelectorAll('.courses-list');
    tabContents.forEach((content) => {
        content.classList.remove('active');
    });
    const tabs = document.querySelectorAll('.course-type');
    tabs.forEach((content) => {
        content.classList.remove('active');
    });
    const selectedContent = document.getElementById(`courses-list-${tabIndex}`);
    selectedContent?.classList.add('active');
    const selectedTab = document.getElementById(`course-tab-${tabIndex}`);
    selectedTab?.classList.add('active');
}
function showQuestion(tabIndex) {
    const selectedTab = document.getElementById(`question-container-${tabIndex}`);
    if (selectedTab.classList.contains('active')) {
        selectedTab.classList.remove('active');
    } else {
        selectedTab.classList.add('active');
    }
}
document.getElementById("course-search-form")?.addEventListener("submit", function(event){
    event.preventDefault();
    document.getElementById("course-search-input").value = null;
});

async function getContent() {
    let request = await fetch("http://bishplus.ru/api/get-popular-courses/");
    let data = await request.json();
    console.log(data);
    let dataIndex = 0;
    let coursesLists = document.querySelectorAll(".courses-list");
    coursesLists.forEach((value) => {
        value.querySelectorAll(".course-description").forEach((elem) => {
            elem.innerHTML = `<h2>${data[dataIndex].name}</h2>
                            <div class="course-separate-line"></div>
                            <p>${data[dataIndex].description}</p>
                            <div class="course-lessons-num">
                                <h3>${data[dataIndex].lessons_counter} дәрес</h3>
                            </div>`;
            dataIndex++;
        });
        dataIndex -= 6;
        value.querySelectorAll(".course-preview-logo").forEach((elem) => {
            elem.src = data[dataIndex].photo_url;
            dataIndex++;
        })
    })
}
getContent();
showTab(1);

