// The five main parts of the kettle's state.
let lidOpen = false;
let targetTemperature = 70;
let currentTemperature = 20;
let isRunning = false;
let heaterOn = false;

// Store the timer ID so STOP can cancel the repeated temperature updates.
let temperatureInterval = null;

const lidDisplay = document.getElementById("lid-display");
const temperatureDisplay = document.getElementById("temperature-display");
const targetDisplay = document.getElementById("target-display");
const heatingDisplay = document.getElementById("heating-display");
const runningDisplay = document.getElementById("running-display");

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

  if (isRunning === true) {
    runningDisplay.textContent = "Yes";
    boilButton.hidden = true;
    setTempButton.hidden = true;
    boilButton.disabled = true;
    setTempButton.disabled = true;
    startStopButton.textContent = "STOP";
  } else {
    runningDisplay.textContent = "No";
    boilButton.hidden = false;
    setTempButton.hidden = false;
    boilButton.disabled = false;
    setTempButton.disabled = false;
    startStopButton.textContent = "START";
  }

  if (isRunning === false) {
    heatingDisplay.textContent = "Off";
  } else if (heaterOn === true) {
    heatingDisplay.textContent = "Heating";
  } else {
    heatingDisplay.textContent = "Paused";
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
  if (isRunning === false) {
    targetTemperature = 100;
    updateDisplay();
  }
});

setTempButton.addEventListener("click", function () {
  if (isRunning === false) {
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
  clearInterval(temperatureInterval);
  temperatureInterval = null;
}

function startTemperatureInterval() {
  stopTemperatureInterval();
  if (heaterOn === true) {
    temperatureInterval = setInterval(updateTemperatureCycle, 500);
  } else {
    temperatureInterval = setInterval(updateTemperatureCycle, 100);
  }
}

function updateTemperatureCycle() {
  if (isRunning === true) {
    if (heaterOn === true) {
      if (currentTemperature < targetTemperature) {
        currentTemperature += 1;
      }

      if (currentTemperature >= targetTemperature) {
        currentTemperature = targetTemperature;
        // Pause the heater; continue the cycle at the cooling pace.
        heaterOn = false;
        startTemperatureInterval();
      }
    } else {
      if (currentTemperature > targetTemperature - 5) {
        currentTemperature -= 1;
      }

      if (currentTemperature <= targetTemperature - 5) {
        heaterOn = true;
        startTemperatureInterval();
      }
    }
    updateDisplay();
  }
}

startStopButton.addEventListener("click", function () {
  if (isRunning === false) {
    isRunning = true;
    if (currentTemperature < targetTemperature) {
      heaterOn = true;
    } else {
      heaterOn = false;
    }
    startTemperatureInterval();
  } else {
    // STOP ends the entire cycle, including cooling.
    isRunning = false;
    heaterOn = false;
    stopTemperatureInterval();
  }
  updateDisplay();
});

updateDisplay();
