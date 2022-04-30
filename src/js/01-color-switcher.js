const startRandomColor = document.querySelector('button[data-start]');
const stopRandomColor = document.querySelector('button[data-stop]');

startRandomColor.addEventListener('click', getStart);
stopRandomColor.addEventListener('click', getStop);

function getStart() {
  startRandomColor.setAttribute('disabled', 'disabled');
  stopRandomColor.removeAttribute('disabled');
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
}

function getStop() {
  stopRandomColor.setAttribute('disabled', 'disabled');
  startRandomColor.removeAttribute('disabled');
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
