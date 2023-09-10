function showTabContainer(index) {
    let tabContainers = document.querySelectorAll(".tab-container");
    let tabs = document.querySelectorAll(".course-tab");
    if (tabContainers[index - 1].classList.contains("active")) {
        tabContainers[index - 1].classList.remove("active");
        tabs[index - 1].classList.remove("active");
    } else {
        tabContainers.forEach((value) => {
            if (value.classList.contains("active")) {
                value.classList.remove("active");
            }
        })
        tabContainers[index - 1].classList.add("active");
        tabs.forEach((value) => {
            if (value.classList.contains("active")) {
                value.classList.remove("active");
            }
        })
        tabs[index - 1].classList.add("active");
    }
}