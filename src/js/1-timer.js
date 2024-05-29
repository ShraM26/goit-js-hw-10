
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnStart = document.querySelector('[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

     if (selectedDate > currentDate) {
      btnStart.disabled = false; // Активуємо кнопку, якщо обрана дата в майбутньому
    } else {
      btnStart.disabled = true; // Деактивуємо кнопку, якщо обрана дата в минулому або не вибрана
      window.alert("Please choose a date in the future");
    }
  }
};

flatpickr('#datetime-picker', options);
let userSelectedDate;



