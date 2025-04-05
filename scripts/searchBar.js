// Search Bar Functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  searchForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent the default form submission
      const searchTerm = searchInput.value.trim(); 

      if (searchTerm) {
          window.location.href = `https://www.nasa.gov/?search=${encodeURIComponent(searchTerm)}`;
      }
  });
});
