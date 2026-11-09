// The four main parts of the kettle's state.
let lidOpen = false;
let targetTemperature = 70;
let currentTemperature = 20;
let isHeating = false;

// Store the timer ID so STOP can cancel the repeated temperature updates.
let heatingInterval = null;

const lidDisplay = document.getElementById("lid-display");
const temperatureDisplay = document.getElementById("temperature-display");
const targetDisplay = document.getElementById("target-display");
const heatingDisplay = document.getElementById("heating-display");

const openButton = document.getElementById("open-button");
const closeLidButton = document.getElementById("close-lid-button");
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

  temperatureDisplay.textContent = currentTemperature + "°C";
  targetDisplay.textContent = targetTemperature + "°C";

  if (isHeating === true) {
    heatingDisplay.textContent = "Heating";
    boilButton.hidden = true;
    setTempButton.hidden = true;
    boilButton.disabled = true;
    setTempButton.disabled = true;
    startStopButton.textContent = "STOP";
  } else {
    heatingDisplay.textContent = "Stopped";
    boilButton.hidden = false;
    setTempButton.hidden = false;
    boilButton.disabled = false;
    setTempButton.disabled = false;
    startStopButton.textContent = "START";
  }
}

openButton.addEventListener("click", function () {
  lidOpen = true;
  updateDisplay();
});

closeLidButton.addEventListener("click", function () {
  lidOpen = false;
  updateDisplay();
});

boilButton.addEventListener("click", function () {
  if (isHeating === false) {
    targetTemperature = 100;
    updateDisplay();
  }
});

setTempButton.addEventListener("click", function () {
  if (isHeating === false) {
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
  }
});

function stopTemperatureInterval() {
  clearInterval(heatingInterval);
  heatingInterval = null;
}

function increaseTemperature() {
  if (currentTemperature < targetTemperature) {
    currentTemperature += 1;
  }

  if (currentTemperature >= targetTemperature) {
    // End the repetition without inventing automatic shutoff behavior.
    stopTemperatureInterval();
  }
  updateDisplay();
}

startStopButton.addEventListener("click", function () {
  if (isHeating === false) {
    isHeating = true;
    if (currentTemperature < targetTemperature) {
      heatingInterval = setInterval(increaseTemperature, 100);
    }
  } else {
    isHeating = false;
    stopTemperatureInterval();
  }
  updateDisplay();
});

updateDisplay();
