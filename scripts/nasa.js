// NASA API portal https://api.nasa.gov/
// DOM Elements
const imagesContainer = document.getElementById("apod-container-grid");
const favoritesContainer = document.getElementById("favorites-container-grid");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

// Global array/object
let resultsArray = [];
let favorites = JSON.parse(localStorage.getItem("nasaFavorites")) || {};

function showContent() {
  loader.classList.add("hidden");
}

// Fetches images from the NASA API
async function getNasaPictures(apiKey, count = 5) {
  // NASA API key
  const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;
  try {
    // Show loader while fetching data
    loader.classList.remove("hidden"); // Remove hidden class to show loader
    // Clear container before fetching new images
    imagesContainer.innerHTML = "";

    const response = await fetch(apiURL);
    resultsArray = await response.json();

    // Debugging
    // console.log(resultsArray);

    updateDOM();
    // Catch any errors that occur during the fetch
  } catch (error) {
    console.error("Error fetching NASA pictures:", error);
  }
}

// Function to update the DOM
function updateDOM() {
  resultsArray.forEach((result) => {
    // Card Container
    const card = document.createElement("div");
    card.classList.add("apod-card-layout");

    // Link to full image
    const link = document.createElement("a");
    link.href = result.hdurl || result.url;
    link.title = "View Full Image";
    link.target = "_blank";

    // Image
    const image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = result.url;
    image.alt = "NASA Astronomy Picture of the Day";
    image.loading = "lazy";

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Card Title
    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;

    // Save Favorite
    const saveText = document.createElement("p");
    saveText.classList.add("clickable");
    saveText.textContent = "Add to Favorites";
    saveText.setAttribute("onclick", `saveFavorite('${result.url}')`);

    // Card Text
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = result.explanation;

    // Card Footer
    const cardFooter = document.createElement("small");
    cardFooter.classList.add("text-muted");
    // Date
    const date = document.createElement("strong");
    date.textContent = result.date;

    // Copyright
    const copyrightResult =
      result.copyright === undefined ? "" : result.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;

    // Append elements to the card
    cardFooter.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, cardFooter);
    link.appendChild(image);
    card.append(link, cardBody);

    // Append card to the container
    imagesContainer.appendChild(card);
    // console.log("Card appended to imagesContainer:", card);

    // Show content after images are loaded
    showContent();
  });
}

// Add result to Favorites
function saveFavorite(itemUrl) {
  // console.log(itemUrl);
  // Loop through resultsArray to select Favorite
  resultsArray.forEach((item) => {
    // Check if the item is not already in favorites
    if (item.url === itemUrl && !favorites[itemUrl]) {
      favorites[itemUrl] = item; // Add to favorites object using the URL as the key

      // Show Save Confirmation for 2 seconds
      saveConfirmed.classList.remove("hidden"); // Remove hidden class
      setTimeout(() => {
        saveConfirmed.classList.add("hidden"); // Add hidden class after timeout
      }, 2000);

      // Set Favorites in Local Storage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
      // console.log("Favorite Saved Object:", favorites); // Debugging log
    }
  });
}

// Function to load more images on button click
document.getElementById("load-more").addEventListener("click", () => {
  getNasaPictures();
});

// On Load
getNasaPictures(window.CONFIG.NASA_API_KEY);
