// These three variables store independent parts of the kettle's state.
let lidOpen = false;
let targetTemperature = 70;
let isHeating = false;

const lidDisplay = document.getElementById("lid-display");
const temperatureDisplay = document.getElementById("temperature-display");
const heatingDisplay = document.getElementById("heating-display");

const openButton = document.getElementById("open-button");
const boilButton = document.getElementById("boil-button");
const setTempButton = document.getElementById("set-temp-button");
const startStopButton = document.getElementById("start-stop-button");

// Read the current state and show it in the HTML.
function updateDisplay() {
  if (lidOpen === true) {
    lidDisplay.textContent = "Open";
  } else {
    lidDisplay.textContent = "Closed";
  }

  temperatureDisplay.textContent = targetTemperature + "°C";

  if (isHeating === true) {
    heatingDisplay.textContent = "Heating";
  } else {
    heatingDisplay.textContent = "Stopped";
  }
}

openButton.addEventListener("click", function () {
  lidOpen = true;
  updateDisplay();
});

boilButton.addEventListener("click", function () {
  targetTemperature = 100;
  updateDisplay();
});

setTempButton.addEventListener("click", function () {
  if (targetTemperature === 70) {
    targetTemperature = 80;
  } else if (targetTemperature === 80) {
    targetTemperature = 90;
  } else if (targetTemperature === 90) {
    targetTemperature = 100;
  } else {
    targetTemperature = 70;
  }
  updateDisplay();
});

startStopButton.addEventListener("click", function () {
  if (isHeating === false) {
    isHeating = true;
  } else {
    isHeating = false;
  }
  updateDisplay();
});

updateDisplay();
