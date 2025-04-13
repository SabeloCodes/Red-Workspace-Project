// Load navigation and footer dynamically into the page
function loadCommonElements() {
    // Load the navigation bar from nav.html into the <header> tag
    fetch('nav.html')
      .then(res => res.text())
      .then(data => {
        document.querySelector('header').innerHTML = data;
      });

    // Load the footer from footer.html into the <footer> tag
    fetch('footer.html')
      .then(res => res.text())
      .then(data => {
        document.querySelector('footer').innerHTML = data;
      });
}

// Wait for the DOM to fully load before initializing functions
document.addEventListener('DOMContentLoaded', () => {
    loadCommonElements(); // Load nav and footer
    initCarousel();       // Start the image carousel

    // Toggle hamburger menu
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('hamburger')) {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('active');
    }
  });
});

// Image carousel logic with auto-slide and fade/zoom animation
function initCarousel() {
    const images = document.querySelectorAll('.carousel-image'); // Get all carousel images
    let current = 0; // Start from the first image

    // Function to display the image at the given index
    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove('active'); // Hide all images
            if (i === index) {
                img.classList.add('active'); // Show the current image
            }
        });
    }

    showImage(current); // Display the first image on load

    // Change image every 5 seconds
    setInterval(() => {
        current = (current + 1) % images.length; // Move to the next image
        showImage(current);
    }, 5000); // 5000ms = 5s
}