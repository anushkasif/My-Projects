const btnEl = document.querySelector(".btn");
const closeIconEl = document.querySelector(".close-icon");
const trailerContainerEl = document.querySelector(".trailer-container");
const videoEl = document.querySelector("video");

btnEl.addEventListener("click", () => {
  trailerContainerEl.classList.remove("active");
  videoEl.play();  // Video ko play karna agar "Watch Now" button press kiya jaye
});

closeIconEl.addEventListener("click", () => {
  trailerContainerEl.classList.add("active");
  videoEl.pause();  // Video ko pause karna jab close icon pe click ho
  videoEl.currentTime = 0;  // Video ka time reset karna
});
