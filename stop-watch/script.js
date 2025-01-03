const $timerEl = $("#timer");
const $startButtonEl = $("#start");
const $stopButtonEl = $("#stop");
const $resetButtonEl = $("#reset");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;

// Start the timer
function startTimer() {
  startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    $timerEl.text(formatTime(elapsedTime));
  }, 10);

  $startButtonEl.prop("disabled", true);
  $stopButtonEl.prop("disabled", false);
}

// Format elapsed time to hh:mm:ss.milliseconds
function formatTime(elapsedTime) {
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  return (
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") +
    "." +
    (milliseconds > 9 ? milliseconds : "0" + milliseconds)
  );
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  $startButtonEl.prop("disabled", false);
  $stopButtonEl.prop("disabled", true);
}

// Reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  $timerEl.text("00:00:00");

  $startButtonEl.prop("disabled", false);
  $stopButtonEl.prop("disabled", true);
}

// Event Listeners
$startButtonEl.on("click", startTimer);
$stopButtonEl.on("click", stopTimer);
$resetButtonEl.on("click", resetTimer);
