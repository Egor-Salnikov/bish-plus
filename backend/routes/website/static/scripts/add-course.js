// Получаем ссылки на элементы DOM
const imageInput = document.getElementById('add-course-picture');
const imageLabel = document.getElementById('upload-course-picture-label');

// Добавляем обработчик события изменения input file
imageInput.addEventListener('change', function() {
    // Проверяем, что выбран хотя бы один файл
    if (imageInput.files.length > 0) {
        // Получаем первый выбранный файл
        const selectedImage = imageInput.files[0];

        // Создаем объект URL для отображения изображения
        const imageUrl = URL.createObjectURL(selectedImage);

        // Устанавливаем src атрибут изображения
        imageLabel.innerHTML = `<img src="${imageUrl}" alt="Upload picture" id="uploaded-course-picture">`;
        document.getElementById('uploaded-course-picture').setAttribute("active");
    }
});
