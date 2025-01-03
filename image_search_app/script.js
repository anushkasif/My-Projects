const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  if (!inputData.trim()) {
    searchResultsEl.innerHTML = ""; // Clear results if input is empty
    showMoreButtonEl.style.display = "none";
    return;
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    imageWrapper.style.position = "relative"; // For position relative of download icon

    // Image Element
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description || "Image";
    image.classList.add("search-image");

   // Download Icon
const downloadIcon = document.createElement("i");
downloadIcon.classList.add("fas", "fa-download", "download-icon");

// Create an anchor element for the download link
const downloadLink = document.createElement("a");
downloadLink.style.display = "none";  // Hide the anchor element

// When the download icon is clicked, trigger the download
downloadIcon.onclick = () => {
    fetch(result.urls.full)  // Fetch the image from the URL
        .then(response => response.blob())  // Convert the response to a Blob
        .then(blob => {
            // Create an object URL for the Blob
            const url = URL.createObjectURL(blob);
            
            // Set the download link attributes
            downloadLink.href = url;
            downloadLink.download = "image.jpg"; // Set the desired file name
            
            // Trigger the download
            downloadLink.click();

            // Revoke the object URL after the download
            URL.revokeObjectURL(url);
        })
        .catch(err => {
            console.error('Download failed:', err);
        });
};

// Append the icon to your page (as before)
document.body.appendChild(downloadIcon);

    // Image Link (for viewing image on Unsplash)
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description || "View Image";

    // Append elements
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(downloadIcon); // Append download icon
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  page++;

  if (results.length > 0) {
    showMoreButtonEl.style.display = "block";
  } else {
    showMoreButtonEl.style.display = "none";
  }
}

// Trigger search on input
searchInputEl.addEventListener("input", () => {
  page = 1;
  searchImages();
});

// Handle "Show More" button click
showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});

// Function to download image
function downloadImage(url) {
  const link = document.createElement("a");
  link.href = url;
  link.download = url.split('/').pop(); // Using the last part of the URL as the filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
