document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const marsGrid = document.querySelector(".mars-container-grid");
    const loadBtn = document.getElementById("load-more-images");
    const loader = document.querySelector(".loader");
    let currentIndex = 0; 

    // Fetch initial images when page loads
    fetchMarsImages();

    // Load more images when the button is clicked
    loadBtn.addEventListener("click", loadMoreImages);

    async function fetchMarsImages() {
        try {
            // Show Loader
            loader.classList.remove("hidden");
    
            // Fetch JSON data
            const response = await fetch("./json/mars.json");
            if (!response.ok) {
            throw new Error("Network response error");
            }
            const data = await response.json();
            // console.log("Data fetched successfully:", data.photos.length,"photos available"); 
    
            // Cerate initial cards
            createImagecards(data.photos.slice(currentIndex, currentIndex + 4));
            currentIndex += 4; // Increment the index for the next batch
            // Hide Loader
            loader.classList.add("hidden");
        } catch (error) {
            console.error("Error fetching Mars images:", error);
        }
    }

    function createImagecards(photos) {
        photos.forEach((photo) => {
            // Card Container
            const card = document.createElement("div");
            card.classList.add("mars-card-layout");
    
            // Link to full image
            const link = document.createElement("a");
            link.href = photo.img_src;
            link.title = "View Full Image";
            link.target = "_blank";
    
            // Image
            const image = document.createElement("img");
            image.classList.add("card-img-top");
            image.src = photo.img_src;
            image.alt = "Mars Rover Image";
            image.loading = "lazy";
    
            // Card Body
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            const cameraInfo = document.createElement("p");
            cameraInfo.classList.add("card-text");
            cameraInfo.textContent = `Camera: ${photo.camera.full_name}`;
            const photoDate = document.createElement("p");
            photoDate.classList.add("card-text");
            photoDate.textContent = `Earth Date: ${new Date(
            photo.earth_date
            ).toLocaleDateString()}`;
            const missionInfo = document.createElement("p");
            missionInfo.classList.add("card-text");
            missionInfo.textContent = `Rover: ${photo.rover.name} | Status: ${photo.rover.status}`;
    
            // Append card body elements
            cardBody.append(cameraInfo, photoDate, missionInfo);
    
            // Append image to link
            link.appendChild(image);
            // Append link and card body to card
            card.appendChild(link);
            card.appendChild(cardBody);
    
            // Append the card to the marsGrid
            marsGrid.appendChild(card);
        });
    }

    async function loadMoreImages() {
        try {
            // Show Loader
            loader.classList.remove("hidden");
    
            // Clear existing cards
            marsGrid.innerHTML = "";
    
            const response = await fetch("./json/mars.json");
            const data = await response.json();
    
            // Get next batch of images
            const newPhotos = data.photos.slice(currentIndex, currentIndex + 4);
            createImagecards(newPhotos);
    
            currentIndex += 4; // Increment the index for the next batch
    
            // Hide Loader
            loader.classList.add("hidden");
    
            // Disable the load more button if no more images are available
            if (currentIndex >= data.photos.length) {
            loadBtn.disabled = true;
            // console.log("No more images to load."); // Debugging line
            loadBtn.textContent = "All Images Loaded";
            }
        } catch (error) {
            console.error("Error loading more Mars images:", error);
        }
    }
});