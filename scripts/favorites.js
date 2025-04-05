const favoritesContainer = document.querySelector(".favorites-container-grid");
const loader = document.querySelector(".loader");

document.addEventListener("DOMContentLoaded", () => {
  function createFavoriteCard(item) {
    // Favorite Card Container
    const card = document.createElement("div");
    card.classList.add("favorite-card-layout");

    // Link to full image
    const link = document.createElement("a");
    link.href = item.hdurl || item.url;
    link.title = "View Full Image";
    link.target = "_blank";

    // Image
    const image = document.createElement("img");
    image.classList.add("card-img-top");
    image.src = item.url;
    image.alt = "NASA Astronomy Picture of the Day";
    image.loading = "lazy";
    link.appendChild(image);

    // Card Body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Card Title
    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = item.title;

    // Remove Favorite
    const removeText = document.createElement("p");
    removeText.classList.add("clickable");
    removeText.textContent = "Remove from Favorites";
    removeText.addEventListener("click", () => removeFavorite(item.url));

    // Card Text
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = item.explanation;

    // Card Footer
    const cardFooter = document.createElement("small");
    cardFooter.classList.add("text-muted");

    // Date
    const date = document.createElement("strong");
    date.textContent = item.date;

    // Copyright
    const copyrightResult = item.copyright === undefined ? "" : item.copyright;
    const copyright = document.createElement("span");
    copyright.textContent = ` ${copyrightResult}`;

    cardFooter.append(date, copyright);
    cardBody.append(cardTitle, removeText, cardText, cardFooter);
    card.append(link, cardBody);

    return card;
  }

  function removeFavorite(itemUrl) {
    const storedFavorites = localStorage.getItem("nasaFavorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : {};

    if (favorites[itemUrl]) {
      delete favorites[itemUrl];
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));

      // Show Remove Confirmation message
      const removeConfirmed = document.querySelector(".remove-confirmed"); // find remove-confirmed class
      removeConfirmed.classList.remove("hidden");
      setTimeout(() => {
        removeConfirmed.classList.add("hidden");
      }, 1500);

      // Refresh the displayed favorites
      displayFavorites();
    }
  }

  function displayFavorites() {
    const storedFavorites = localStorage.getItem("nasaFavorites");
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : {};

    favoritesContainer.innerHTML = ""; // Clear existing content

    if (Object.keys(favorites).length === 0) {
      const noFavoritesMessage = document.createElement("p");
      noFavoritesMessage.textContent = "No favorites saved yet.";
      noFavoritesMessage.style.color = "black";
      noFavoritesMessage.style.fontSize = "1.1rem";
      noFavoritesMessage.style.textTransform = "capitalize";

      favoritesContainer.appendChild(noFavoritesMessage);
      return;
    }

    Object.values(favorites).forEach((item) => {
      const card = createFavoriteCard(item);
      favoritesContainer.appendChild(card);
    });
  }

  displayFavorites();
});
