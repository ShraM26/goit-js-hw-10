
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function elemDOM(selector) {
  return document.querySelector(selector);
};
const btnStart = elemDOM('[data-start]');
const days = elemDOM('[data-days]');
const hours = elemDOM('[data-hours]');
const minutes = elemDOM('[data-minutes]');
const seconds = elemDOM('[data-seconds]');
const datetime = elemDOM('#datetime-picker');



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
flatpickr(datetime, options);
// Обробка вибору дати
function handleDateSelection(selectedDates) {
  const selectedDate = selectedDates[0];
  const currentDate = new Date();
   
  if (selectedDate > currentDate) {
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
    message: message,
    position: 'topRight'
  });
}
// Начало отсчета таймера при нажатии на кнопку Start
btnStart.addEventListener('click', startTimer);

function startTimer () {
  btnStart.disabled = true;
  datetime.disabled = true;
  
  const countdownDate = new Date(userSelectedDate).getTime();
  const timerInterval = setInterval(updateTimer, 1000);

  // Функция обновления таймера
  function updateTimer() {
    const currentTime = new Date().getTime();
    const difference = countdownDate - currentTime;

    if (difference <= 0) {
      clearInterval(timerInterval);
      // Действия при завершении отсчета
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';
      btnStart.disabled = false;
      datetime.disabled = false;
      return;
    }

    const time = convertMs(difference);

    // Отображение времени в интерфейсе с добавлением ведущих нулей
    days.textContent = addLeadingZero(time.days);
    hours.textContent = addLeadingZero(time.hours);
    minutes.textContent = addLeadingZero(time.minutes);
    seconds.textContent = addLeadingZero(time.seconds);
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





