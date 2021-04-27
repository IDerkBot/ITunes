import { addZero } from "./supscript.js"; // Импортирование общих функций

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player'); // Выбор элемента по его классу
    const videoButtonPlay = document.querySelector('.video-button__play'); // Выбор элемента по его классу
    const videoButtonStop = document.querySelector('.video-button__stop'); // Выбор элемента по его классу
    const videoTimePassed = document.querySelector('.video-time__passed'); // Выбор элемента по его классу
    const videoProgress = document.querySelector('.video-progress'); // Выбор элемента по его классу
    const videoTimeTotal = document.querySelector('.video-time__total'); // Выбор элемента по его классу
    const videoFullScreen = document.querySelector('.video-fullscreen'); // Выбор элемента по его классу
    const videoVolume = document.querySelector('.video-volume'); // Выбор элемента по его классу
    const videoVolumeDown = document.querySelector('.volume-down'); // Выбор элемента по его классу
    const videoVolumeUp = document.querySelector('.volume-up'); // Выбор элемента по его классу

    videoFullScreen.addEventListener('click', () =>{
        // videoPlayer.webkitEnterFullScreen();
        videoPlayer.requestFullscreen();
    }); // Полноэкранный режим

    const toggleIcon = () => {
        if (videoPlayer.paused){ // Если видео плеер остановлен, то изменить иконку паузы на плэй
            // videoButtonPlay.classList.remove('fa-pause'); // Удаление иконки паузы
            // videoButtonPlay.classList.add('fa-play'); // Добавление иконки плэй
            videoButtonPlay.classList.replace('fa-pause', 'fa-play') // Замена иконки паузы на плэй
        }
        else{ // Иначе изменить иконку плэй на паузу
            // videoButtonPlay.classList.add('fa-pause'); // Добавление иконки паузы
            // videoButtonPlay.classList.remove('fa-play'); // Удаление иконки плэй
            videoButtonPlay.classList.replace('fa-play', 'fa-pause') // Замена иконки плэй на паузу
        }
    }; // Изменение иконки
    const togglePlay = () => {
        if (videoPlayer.paused){ videoPlayer.play(); } else{ videoPlayer.pause(); }
    }; // Переключение паузы/плэй
    const stopPlay = () => {
        videoPlayer.pause(); // Остановка видео
        videoPlayer.currentTime = 0; // Сброс прошедшего времени видео
    }; // Полная остановка видео
    const toggleIconVolume = () => {
        if (videoPlayer.volume === 0){ // Если громкость равна нулю, то заменить иконку звука на иконку мута
            // videoVolumeDown.classList.remove('fa-volume-down');
            // videoVolumeDown.classList.add('fa-volume-off');
            videoVolumeDown.classList.replace('fa-volume-down', 'fa-volume-off')
        } else { // Иначе заменить иконку мута на иконку звука
            // videoVolumeDown.classList.remove('fa-volume-off');
            // videoVolumeDown.classList.add('fa-volume-down');
            videoVolumeDown.classList.replace('fa-volume-of', 'ffa-volume-down')
        }
    }; // Переключение иконки звука

    // const addZero = n => n < 10 ? '0' + n : n; // Перенесенно в общую функцию

    videoPlayer.addEventListener('click', togglePlay); // Просмотр/пауза при клике на плеер
    videoButtonPlay.addEventListener('click', togglePlay); // Просмотр/пауза при клике на иконку [play|pause]
    videoButtonStop.addEventListener('click', stopPlay); // Остановка воспроизведения при нажатии на иконку [stop]
    videoPlayer.addEventListener('play', toggleIcon); // Смена иконки при запуске видео
    videoPlayer.addEventListener('pause', toggleIcon); // Смена иконки при остановке видео
    videoPlayer.addEventListener('timeupdate', () =>{
       const currentTime = videoPlayer.currentTime; // Получение текущего времени видео
       const duration = videoPlayer.duration; // Получение длительности видео

       videoProgress.value = (currentTime / duration) * 100; // Получение место положения прогресс бара

       let minutePassed = Math.floor(currentTime / 60); // Высчитывание тещего времени видео в минутах
       let secondPassed = Math.floor(currentTime % 60); // Высчитывание тещего времени видео в секундах

       let minuteTotal = Math.floor(duration / 60); // Высчитывание полного времени видео в минутах
       let secondTotal = Math.floor(duration % 60); // Высчитывание полного времени видео в секундах

       videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondPassed); // `${addZero(minutePassed):${addZero(secondPassed)}}`
       videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondTotal); // `${addZero(minuteTotal):${addZero(secondTotal)}}`
    }); // Обновление показателей времени
    videoProgress.addEventListener('change', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    }); // Событие при изменении положения ползунка

    // input / change
    // input - изменяет в режиме live
    // change - изменяет только когда отпускаешь

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100; // Изменение громкости
        toggleIconVolume(); // Вызов функции смены иконки
    }); // При изменение положения ползунка изменять громкость звука
    videoVolumeDown.addEventListener('click', () => {
        if (videoVolume.value > 9){ // Если положение ползунка больше 9, то убавлять громкость на 10 едениц
            videoVolume.value = videoVolume.value - 10; // Установка ползунка
            videoPlayer.volume = videoVolume.value / 100; // Установка громкости
        } else { // Иначе устанавливать громкость в 0 едениц
            videoVolume.value = 0; // Установка ползунка
            videoPlayer.volume = videoVolume.value / 100; // Установка громкости
        }
        toggleIconVolume(); // Вызов функции смены иконки
    }); // При нажатии кнопки уменьшения звука, убавлять звук на 10 пунктов
    videoVolumeUp.addEventListener('click', () => {
        if (videoVolume.value < 91){ // Если положение ползунка меньше 91, то прибалять громкость на 10 едениц
            videoPlayer.volume = videoPlayer.volume + (10/100); // Установка громкости
            videoVolume.value = videoPlayer.volume * 100; // Установка ползунка
        } else { // Иначе устанавливать громкость в 100 едениц
            videoPlayer.volume = 1; // Установка громкости
            videoVolume.value = 100; // Установка ползунка
        }
        toggleIconVolume(); // Вызов функции смены иконки
    }); // При нажатии кнопки прибавления звука, прибавлять звук на 10 пунктов

    videoPlayer.volume = 0.5; // Установка начального положения ползунка
    videoVolume.value = videoPlayer.volume * 100; // Установка начальной громкости

    videoPlayerInit.stop = () => {
        if(!videoPlayer.paused){
            stopPlay();
        }
    };

};