const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list")) || []; // Safely handle empty list
if (list.length > 0) {
  list.reverse(); // Reverse the array so the most recent task appears first
  list.forEach((task) => {
    toDoList(task);
  });
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputEl.value.trim(); // Trim input to avoid leading/trailing spaces
  let timestamp = "";

  if (task) {
    newTask = task.name;
    timestamp = task.timestamp;
  } else {
    const now = new Date();
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = now.toLocaleDateString("en-GB", options);
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    timestamp = `${date}, ${time}`;
  }

  if (!newTask) return; // Prevent adding empty tasks

  const liEl = document.createElement("li");
  if (task && task.checked) {
    liEl.classList.add("checked");
  }

  liEl.innerHTML = `
    <span>${newTask}</span>
    <small>${timestamp}</small>
  `;
  
  ulEl.prepend(liEl); // Prepend the task at the top
  inputEl.value = "";

  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`;
  liEl.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`;
  liEl.appendChild(trashBtnEl);

  // Toggle the "checked" class when the check button is clicked
  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  // Ask for confirmation before deleting the task
  trashBtnEl.addEventListener("click", () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      liEl.remove();
      updateLocalStorage();
    }
  });

  updateLocalStorage(); // Update localStorage when a new task is added
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");
  list = [];
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.querySelector("span").innerText,
      timestamp: liEl.querySelector("small").innerText,
      checked: liEl.classList.contains("checked"),
    });
  });
  localStorage.setItem("list", JSON.stringify(list));
}

// Fetch tasks from data.json
fetch('/data.json')
  .then((response) => response.json())
  .then((tasks) => {
    tasks.forEach((task) => toDoList(task));
  })
  .catch((error) => console.error("Error loading data:", error));

// Register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((error) => console.error("Service Worker Registration Failed:", error));
}

// Add task when the input field loses focus (tap outside)
inputEl.addEventListener("blur", () => {
  if (inputEl.value.trim()) {
    toDoList();
  }
});
