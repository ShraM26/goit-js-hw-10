
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
let userSelectedDate;
 
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
   
    btnStart.disabled = selectedDate > currentDate ?
      false : (window.alert("Please choose a date in the future"), true);
    userSelectedDate = selectedDate;
    console.log(userSelectedDate);
  }
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click')





