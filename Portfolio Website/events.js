$(function(){
   $('#menu').slicknav({
    // label:"Option"
    label:"",
    brand:"Anukasif"
   });
});

//////////////////skitter Start///////////////
$(document).ready(function() {
   $('.skitter-large').skitter({
      navigation: true,
      dots: false,
      theme:"clean",
      loop:true
    });
 });

 ///////////////////////////Own Carousel Start///////////////////////////////////
 $(document).ready(function(){
   $(".owl-carousel").owlCarousel({
      loop:true,
    margin:20,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:false
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            nav:false,
            loop:true
        }
    }
   });
 });

 /////////////////////Progress Bar////////////////////////////////////////////////
 // Function to update progress using jQuery
// function updateProgress(className, progressPercentage) {
//   $(`.${className}`).css("width", `${progressPercentage}%`);
// }

// // Example usage
// $(document).ready(function () {
//   updateProgress("html_progress", 90); // HTML progress 70%
//   updateProgress("css_progress", 93); // CSS progress 50%
//   updateProgress("js_progress", 80); // JavaScript progress 80%
//   updateProgress("c_progress", 85); // C++ progress 60%
//   updateProgress("cpp_progress", 80); // C++ progress 60%
//   updateProgress("jquery_progress", 90); // JQuery progress 40%
//   updateProgress("bootstrap_progress", 95); // Bootstrap progress 90%
// });

// Function to animate a single progress bar
function updateProgress(className, progressPercentage) {
  $(`.${className}`).animate(
    { width: `${progressPercentage}%` },
    {
      duration: 1000,
      easing: "swing",
    }
  );
}

$(document).ready(function () {
  const progressBars = [
    { className: "html_progress", progressPercentage: 90 },
    { className: "css_progress", progressPercentage: 93 },
    { className: "js_progress", progressPercentage: 80 },
    { className: "c_progress", progressPercentage: 85 },
    { className: "cpp_progress", progressPercentage: 80 },
    { className: "jquery_progress", progressPercentage: 90 },
    { className: "bootstrap_progress", progressPercentage: 95 },
  ];

  // Initialize Intersection Observer
  const observerOptions = {
    root: null, // Default is viewport
    rootMargin: "0px",
    threshold: 0.1, // Trigger animation when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetClass = entry.target.className.split(" ")[1];
        const barData = progressBars.find((bar) => bar.className === targetClass);

        if (barData) {
          updateProgress(barData.className, barData.progressPercentage);
          observer.unobserve(entry.target); // Stop observing after animation
        }
      }
    });
  }, observerOptions);

  // Observe each progress bar
  progressBars.forEach((bar) => {
    const progressElement = document.querySelector(`.${bar.className}`);
    if (progressElement) {
      observer.observe(progressElement);
    }
  });
});

