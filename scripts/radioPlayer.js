export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');// Выбор элемента по его классу
    const radioCoverImg = document.querySelector('.radio-cover__img');// Выбор элемента по его классу
    const radioHeaderBig = document.querySelector('.radio-header__big');// Выбор элемента по его классу
    const radioNavigation = document.querySelector('.radio-navigation');// Выбор элемента по его классу
    const radioItem = document.querySelectorAll('.radio-item');// Выбор элемента по его классу
    const radioStop = document.querySelector('.radio-stop');// Выбор элемента по его классу
    const radioVolume = document.querySelector('.radio-volume');// Выбор элемента по его классу

    const audio = new Audio(); // Создание объекта Аудио
    audio.type = "audio/aac"; // Установка типа принимаемого файла

    radioStop.disabled = true; // Отключение кнопки до запуска радио

    const changeIconPlay = () => {
        if (audio.paused){ // Если радио остановленно, то
            radio.classList.remove('play'); // Удалить стиль play
            radioStop.classList.add('fa-play'); // Добавить стиль fa-play
            radioStop.classList.remove('fa-pause'); // Удалить стиль fa-pause
        } else{ // Иначе
            radioStop.classList.remove('fa-play'); // Удалить стиль fa-play
            radioStop.classList.add('fa-pause'); // Добавить стиль fa-pause
            radio.classList.add('play'); // Добавить стиль play
        }
    }; // Изменение кнопки при изменении состояния Аудио

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select')); // Удаляет у всех item класс select
        elem.classList.add('select'); // Добавляет класс select к выбранному элементу
    } // Добавление стиля к выбранной радиостанции

    radioNavigation.addEventListener('change', event => {
        const target = event.target; // Получение данных с event
        const parent = target.closest('.radio-item'); // Получение родителя объекта target


        // radioItem.forEach(item => item.classList.remove('select'));
        // parent.classList.add('select');
        selectItem(parent); // Вызов функции по изменению стиля выбранной радиостанции

        const title = parent.querySelector('.radio-name').textContent; // Получение названия радиостанции
        radioHeaderBig.textContent = title; // Установка названия радиостанции

        const URLImg = parent.querySelector('.radio-img').src; // Получение картинки радиостанции
        radioCoverImg.src = URLImg; // Установка картинки радиостанции

        audio.src = target.dataset.radioStantion; // Установка ссылки на вещание
        audio.load();
        audio.play(); // Запуск радио
        radioStop.disabled = false; // Включение кнопки
        changeIconPlay(); // Вызов функции изменения иконки
    }); // Переключение радиостанций
    radioStop.addEventListener('click', () => {
       if(audio.paused){ // Если радио остановлено, то
           audio.play(); // включить
       } else { // Иначе
           audio.pause(); // остановить
       }
       changeIconPlay(); // Обращение к функции переключения иконки
    }); // Пауза/Плэй радио при нажатии на кнопку

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
    }); // Изменение кромкости при изменении положения ползунка громкости

    audio.volume = 0.5; // Установка громкости радио
    radioVolume.value = audio.volume * 100; // Установка положения ползунка громкости

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };

};