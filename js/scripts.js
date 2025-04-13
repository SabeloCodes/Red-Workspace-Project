// Load navigation and footer dynamically into the page
function loadCommonElements() {
  // Load the navigation bar from components/nav.html into the <header> tag
  fetch('components/nav.html') 
    .then(res => res.text())
    .then(data => {
      document.getElementById('navigation').innerHTML = data; // for header
    });

  // Load the footer from components/footer.html into the <footer> tag
  fetch('components/footer.html') 
    .then(res => res.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data; // for footer
    });
}

// Wait for the DOM to fully load before initializing functions
document.addEventListener('DOMContentLoaded', () => {
  loadCommonElements(); // Load nav and footer
  initCarousel();       // Start the image carousel
  setupCarouselControls(); // Setup carousel controls


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

// Enhanced carousel features: captions, dot indicators, prev/next buttons
function setupCarouselControls() {
  const images = document.querySelectorAll('.carousel-image');
  const captions = ["NEW CAVENDISH STREET", "MODERN INTERIORS", "LUXURY DESIGN"]; // Captions array
  const captionBox = document.querySelector('.carousel-caption-box .caption-text');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.querySelector('.carousel-dots');
  let current = 0;

  // Function to update the carousel and caption
  function updateCarousel(index) {
      images.forEach((img, i) => {
          img.classList.remove('active');
          if (i === index) {
              img.classList.add('active');
          }
      });
      if (captionBox) {
          captionBox.textContent = captions[index]; // Update caption text
      }
      updateDots(index); // Update active dot
      document.getElementById('currentImage').textContent = index + 1;
      document.getElementById('totalImages').textContent = images.length;
  }

  // Function to update active dot
  function updateDots(index) {
      document.querySelectorAll('.carousel-dots .dot').forEach((dot, i) => {
          if (i === index) {
              dot.classList.add('active');
          } else {
              dot.classList.remove('active');
          }
      });
  }

  // Create dot indicators
  if (dotsContainer) {
      images.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          dot.addEventListener('click', () => {
              current = index;
              updateCarousel(current);
          });
          dotsContainer.appendChild(dot);
      });
      updateDots(current); // Set initial active dot
  }

  // Previous button click handler
  if (prevBtn) {
      prevBtn.addEventListener('click', () => {
          current = (current - 1 + images.length) % images.length;
          updateCarousel(current);
      });
  }

  // Next button click handler
  if (nextBtn) {
      nextBtn.addEventListener('click', () => {
          current = (current + 1) % images.length;
          updateCarousel(current);
      });
  }

  // Initial update
  updateCarousel(current);
}