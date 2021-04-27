import { addZero } from "./supscript.js"; // Импортирование общих функций

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio'); // Выбор элемента по его классу
    const audioImg = document.querySelector('.audio-img'); // Выбор элемента по его классу
    const audioHeader = document.querySelector('.audio-header'); // Выбор элемента по его классу
    const audioPlayer = document.querySelector('.audio-player'); // Выбор элемента по его классу
    const audioNavigation = document.querySelector('.audio-navigation'); // Выбор элемента по его классу
    const audioButtonPlay = document.querySelector('.audio-button__play'); // Выбор элемента по его классу
    const audioProgress = document.querySelector('.audio-progress'); // Выбор элемента по его классу
    const audioProgressTiming = document.querySelector('.audio-progress__timing'); // Выбор элемента по его классу
    const audioTimePassed = document.querySelector('.audio-time__passed'); // Выбор элемента по его классу
    const audioTimeTotal = document.querySelector('.audio-time__total'); // Выбор элемента по его классу

    const playlist = ['hello', 'flow', 'speed']; // Создание плэйлиста

    let trackIndex = 0; // Индекс первого трэка в массиве

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused; // получение значени остановки плеера - false/true
        const track = playlist[trackIndex]; // Получение трэка из плэйлиста
        audioImg.src = `./audio/${track}.jpg`; // Установка изображения трэка
        audioHeader.textContent = track.toUpperCase(); // Установка названия трэка
        audioPlayer.src = `./audio/${track}.mp3`; // Установка пути к трэку

        if(isPlayed) { audioPlayer.pause(); } else { audioPlayer.play(); } // Если трэк играет, то остановить его. Иначе запустить

        // setTimeout(timeUpdate, 100);
        audioPlayer.addEventListener('canplay', () => {
            timeUpdate();
        }); // При переключение трэка устанавливать время в длительность трэка

    }; // Загрузка трэка

    const prevTrack = () => {
        // if(trackIndex !== 0)
        if(trackIndex) { trackIndex--; } else { trackIndex = playlist.length - 1; } // Если трэк не первый, то уменьшить индэкс на 1 еденицу. Иначе получить индекс последнего трэка
        loadTrack(); // Вызов функции загрузки трэка
    }; // Функция смены индекса трэка при нажатии кнопки вызова предыдущего трэка
    const nextTrack = () => {
        if(trackIndex === playlist.length - 1){ trackIndex = 0; } else { trackIndex++; } // Если трэк не последний, то получем индекс первого трэка. Иначе прибавить индэкс на 1 еденицу
        loadTrack(); // Вызов функции загрузки трэка
    }; // Функция смены индекса трэка при нажатии кнопки вызова следующего трэка

    audioNavigation.addEventListener('click', event => {
        const target = event.target; // Получение таргета с event
        if(target.classList.contains('audio-button__play')){ // Если в классах таргета есть класс audio-button__play, то
            audio.classList.toggle('play'); // Переключить класс play
            audioButtonPlay.classList.toggle('fa-play'); // Переключить иконку fa-play      |
            audioButtonPlay.classList.toggle('fa-pause'); // Переключить иконку fa-pause    | Заменяют друг друга

            const track = playlist[trackIndex]; // Получение трэка
            if(audioPlayer.paused){ audioPlayer.play(); } else { audioPlayer.pause(); } // Если плеер остановлен, то включить, иначе остановить
            audioHeader.textContent = track.toUpperCase(); // Выводим название трэка в элемент + название переводим в верхний регистр
        }
        if (target.classList.contains('audio-button__prev')) { prevTrack(); } // Если нажимаем кнопку audio-button__prev, то вызываем функцию переключения трэка
        if (target.classList.contains('audio-button__next')) { nextTrack(); } // Если нажимаем кнопку audio-button__next, то вызываем функцию переключения трэка
    }); // Событие нажатия по понели навигации prev|play|next

    audioPlayer.addEventListener('ended', () => {
        nextTrack(); // Вызов функции переключения трэка
        audioPlayer.play(); // Запуск трэка
    }); // Событие, если трэк закончился, то включить следующий

    const timeUpdate = () => {
        const duration = audioPlayer.duration; // Получение текущего времени трэка
        const currentTime = audioPlayer.currentTime; // Получение длительности видео

        const progress = (currentTime / duration) * 100; // Высчитывание прогресса
        audioProgressTiming.style.width = progress + '%'; // Установка прогресса на прогресс баре

        const minutesPassed = Math.floor(currentTime / 60) || '0'; // Высчитывание тещего времени видео в минутах. Если возращает Null, то заменять на 0
        const secondPassed = Math.floor(currentTime % 60) || '0'; // Высчитывание тещего времени видео в секундах. Если возращает Null, то заменять на 0

        const minutesTotal = Math.floor(duration / 60) || '0'; // Высчитывание полного времени видео в минутах. Если возращает Null, то заменять на 0
        const secondTotal = Math.floor(duration % 60) || '0'; // Высчитывание полного времени видео в секундах. Если возращает Null, то заменять на 0

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondPassed)}`; // Установка текущего времени в элементы
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondTotal)}`; // Установка всего времени в элементы
    }; // Установка времени в значения

    timeUpdate();

    audioPlayer.addEventListener('timeupdate', timeUpdate);

    audioProgress.addEventListener('click', ev => { // ev - event
        const x = ev.offsetX; // Получение местоположение курсора при клике на прогресс бар
        const allWidth = audioProgress.clientWidth; // Получение всей длины прогресс бара
        const progress = (x / allWidth) * audioPlayer.duration; // Высчитывание положения ползунка прогресса
        audioPlayer.currentTime = progress; // Установка текущего времени трэка
    }); // Изменение положения трэка и прогресс бара при нажатии на прогресс бар

    musicPlayerInit.stop = () => {
        if(!audioPlayer.paused){
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.replace('fa-pause', 'fa-play');
        }
    };

};