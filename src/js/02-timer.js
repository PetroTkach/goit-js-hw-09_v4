import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
require('flatpickr/dist/themes/dark.css');

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

let selectedDate = 0;
let timerId = 0;

refs.button.addEventListener('click', getButtonStart);
refs.button.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  altFormat: 'F j, Y',
  time_24hr: true,
  defaultDate: new Date(),
  weekNumbers: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    if (selectedDate < new Date()) {
      Notify.failure('Please choose a date in the future');
      refs.button.setAttribute('disabled', 'disabled');
    } else {
      refs.button.removeAttribute('disabled');
    }
  },
};
flatpickr(refs.input, options);

function getButtonStart() {
  timerId = setInterval(() => {
    const targetDate = selectedDate - new Date();
    refs.button.setAttribute('disabled', 'disabled');
    refs.input.setAttribute('disabled', 'disabled');
    stopTimeOut(targetDate);
    const convertObj = convertMs(targetDate);
    showDate(convertObj);
  }, 1000);
}

function stopTimeOut(targetDates) {
  if (targetDates <= 1000) {
    clearInterval(timerId);
    refs.input.removeAttribute('disabled');
    Notify.success('Time is out');
  }
}

function showDate(time) {
  refs.days.textContent = pad(time.days);
  refs.hours.textContent = pad(time.hours);
  refs.minutes.textContent = pad(time.minutes);
  refs.seconds.textContent = pad(time.seconds);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
