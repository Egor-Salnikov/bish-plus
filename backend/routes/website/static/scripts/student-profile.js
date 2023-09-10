async function getContent() {
    let request = await fetch("http://bishplus.ru/api/get-upcoming-webinars/");
    let data = await request.json();
    let dataIndex = 0;
    console.log(data);
    document.querySelector(".webinars-container")
        .querySelectorAll(".webinar")
        .forEach((value) => {
            value.querySelector(".webinar-preview").src = data[dataIndex].preview_image_url;
            value.querySelector(".webinar-name").innerHTML = `${data[dataIndex].name}`;
            value.querySelector(".webinar-author").innerHTML = `${data[dataIndex].author_name}`;
            dataIndex++;
        });
}
getContent();