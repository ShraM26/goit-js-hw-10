// библиотеки
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
// Функция для создания элемента DOM
 function query(selector) {
  return document.querySelector(selector);
}

// Значения элементов DOM
const elementsDOM = [
  { elDOM: '[data-days]', value: '00' },
  { elDOM: '[data-hours]', value: '00' },
  { elDOM: '[data-minutes]', value: '00' },
  { elDOM: '[data-seconds]', value: '00' }
];
const datetimeInpEL = query('#datetime-picker');
const btnStart = query('[data-start]');
// Получение элементов DOM
const elements = elementsDOM.map(item => ({
  elDOM: query(item.elDOM),
  value: item.value
}));
// выключаем изначально кнопку
btnStart.disabled = true;
// создаем переменую для выбраной дати
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

function activateTimer() {
  // при клики на кнопку  делаем не активным  инпут и кнопку
  btnStart.disabled = true;
  datetimeInpEL.disabled = true;
// переводим выбраную дату пользивателя в милисекунд
  const countdownDateMs = new Date(userSelectedDate).getTime();
  // если все условия соблюдены функция updateTimer повторяется каждую секунду
  const timerInterval = setInterval(updateTimer, 1000);
// функция для обчисление табло
  function updateTimer() {
    // получаем текущюю дату в милисикундах
    const currentTimeMs = Date.now();
    // получаем разницу между текущей и пользыватилем
    const differenceMs = countdownDateMs - currentTimeMs;
// когда мс <= 0 отключаем повторение функции updateTimer акт. инпут и ставим на табло 00.
    if (differenceMs <= 0) {
      clearInterval(timerInterval);
      elements.forEach(item => item.elDOM.textContent = item.value);
      datetimeInpEL.disabled = false;
      return;
    }
// конвертируем млс в функции convertMs и добовляем их к елементам из ДОМ
    const time = convertMs(differenceMs);
    elements.forEach((item, index) => {
      item.elDOM.textContent = addLeadingZero(time[Object.keys(time)[index]]);
    });
  }
}
// функ. Добавление  нулей в начало
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// функ. получает милисикунды возвращает обьект { days, hours, minutes, seconds }
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





// ===================================================================
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
