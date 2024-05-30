
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function elemDOM(selector) {
  return document.querySelector(selector);
};
const btnStart = elemDOM('[data-start]');
const daysEL = elemDOM('[data-days]');
const hoursEL = elemDOM('[data-hours]');
const minutesEL = elemDOM('[data-minutes]');
const secondsEL = elemDOM('[data-seconds]');
const datetimeInpEL = elemDOM('#datetime-picker');

btnStart.disabled = true;
let userSelectedDate;
 // Опции для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates);
  }
}
// Инициализация flatpickr
flatpickr(datetimeInpEL, options);
// Обробка вибору дати
function handleDateSelection(selectedDates) {
  const selectedDate = selectedDates[0];

  if (selectedDate > new Date()) {
    btnStart.disabled = false;
    userSelectedDate = selectedDate;
  } else {
    showError("Please choose a date in the future");
    btnStart.disabled = true;
  }
}
// Показ помилки через ізіТост
function showError(message) {
  iziToast.error({
    title: 'Error',
    titleColor: '#fff',
    message: message,
    messageColor: '#fff',
    backgroundColor: '#ef4040',
    position: 'topRight',
    iconColor: '#fff',
    theme: 'dark',
  });
}
// Начало отсчета таймера при нажатии на кнопку Start
btnStart.addEventListener('click', activateTimer);

function activateTimer () {
  btnStart.disabled = true;
  datetimeInpEL.disabled = true;
// получаем количиство милисекунд
  const countdownDateMs = new Date(userSelectedDate).getTime();
//  обчесляем раз на секунду
  const timerInterval = setInterval(updateTimer, 1000);
  // Функция обновления таймера
  function updateTimer() {
    // получаем текущее количество милисекунд
    const currentTimeMs = new Date().getTime();
    // отнимаем выбраное количиство  полюзувателем от текущего
    const differenceMs = countdownDateMs - currentTimeMs;
// останавливаем таймер когда кончится время и обчесление раз в секунду 
    if (differenceMs <= 0) {
      clearInterval(timerInterval);
      // Действия при завершении отсчета
     for (const item of elementsDOM) {
         item.elDOM.textContent = item.value;
       }
        datetimeInpEL.disabled = false;
        return;
    }
    const time = convertMs(differenceMs);
    // Отображение времени в интерфейсе с добавлением ведущих нулей
       for (const [index, item] of elementsDOM.entries()) {
             item.elDOM.textContent = addLeadingZero(time[Object.keys(time)[index]]);
         }
  }
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const elementsDOM = [
  { elDOM: daysEL, value: '00' },
  { elDOM: hoursEL, value: '00' },
  { elDOM: minutesEL, value: '00' },
  { elDOM: secondsEL, value: '00' }
];


// Действия при завершении отсчета легкий вариант
  // daysEL.textContent = '00';
  //     hoursEL.textContent = '00';
  //     minutesEL.textContent = '00';
  //     secondsEL.textContent = '00';
  //     datetimeInpEL.disabled = false;
  //     return;
 // Отображение времени в интерфейсе с добавлением ведущих нулей легкий вариант
    // daysEL.textContent = addLeadingZero(time.days);
    // hoursEL.textContent = addLeadingZero(time.hours);
    // minutesEL.textContent = addLeadingZero(time.minutes);
    // secondsEL.textContent = addLeadingZero(time.seconds);

// ===============================================================
    // Функция для создания элемента DOM
// function elemDOM(selector) {
//   return document.querySelector(selector);
// }

// // Значения элементов DOM
// const elementsDOM = [
//   { elDOM: '[data-days]', value: '00' },
//   { elDOM: '[data-hours]', value: '00' },
//   { elDOM: '[data-minutes]', value: '00' },
//   { elDOM: '[data-seconds]', value: '00' }
// ];

// // Получение элементов DOM
// const elements = elementsDOM.map(item => ({
//   elDOM: elemDOM(item.elDOM),
//   value: item.value
// }));

// // Настройки для flatpickr
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     handleDateSelection(selectedDates);
//   }
// };

// // Инициализация flatpickr
// const datetimeInpEL = elemDOM('#datetime-picker');
// flatpickr(datetimeInpEL, options);

// // Обработка выбора даты
// let userSelectedDate;
// function handleDateSelection(selectedDates) {
//   const selectedDate = selectedDates[0];
//   if (selectedDate > new Date()) {
//     btnStart.disabled = false;
//     userSelectedDate = selectedDate;
//   } else {
//     showError("Please choose a date in the future");
//     btnStart.disabled = true;
//   }
// }

// // Показ сообщения об ошибке
// function showError(message) {
//   iziToast.error({
//     title: 'Error',
//     titleColor: '#fff',
//     message: message,
//     messageColor: '#fff',
//     backgroundColor: '#ef4040',
//     position: 'topRight',
//     iconColor: '#fff',
//     theme: 'dark',
//   });
// }

// // Обработчик кнопки Start
// const btnStart = elemDOM('[data-start]');
// btnStart.addEventListener('click', activateTimer);

// function activateTimer() {
//   btnStart.disabled = true;
//   datetimeInpEL.disabled = true;

//   const countdownDateMs = new Date(userSelectedDate).getTime();
//   const timerInterval = setInterval(updateTimer, 1000);

//   function updateTimer() {
//     const currentTimeMs = new Date().getTime();
//     const differenceMs = countdownDateMs - currentTimeMs;

//     if (differenceMs <= 0) {
//       clearInterval(timerInterval);
//       elements.forEach(item => item.elDOM.textContent = item.value);
//       datetimeInpEL.disabled = false;
//       return;
//     }

//     const time = convertMs(differenceMs);
//     elements.forEach((item, index) => {
//       item.elDOM.textContent = addLeadingZero(time[Object.keys(time)[index]]);
//     });
//   }
// }

// // Добавление ведущих нулей
// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// // Функция для конвертации миллисекунд в дни, часы, минуты и секунды
// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }