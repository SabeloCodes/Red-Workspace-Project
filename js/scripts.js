// Function to load common elements (navigation and footer) dynamically
function loadCommonElements() {
  Promise.all([
      fetch('components/nav.html')
          .then(res => {
              if (!res.ok) {
                  throw new Error(`HTTP error! status: ${res.status}`);
              }
              return res.text();
          }),
      fetch('components/footer.html')
          .then(res => {
              if (!res.ok) {
                  throw new Error(`HTTP error! status: ${res.status}`);
              }
              return res.text();
          })
  ])
  .then(([navData, footerData]) => {
      document.getElementById('navigation').innerHTML = navData;
      document.getElementById('footer').innerHTML = footerData;
  })
  .catch(error => console.error('Error loading components:', error));
}

// Event listener to execute code after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadCommonElements(); // Load navigation and footer
  initCarousel(); // Initialize the image carousel
  setupCarouselControls(); // Setup carousel controls (prev/next, dots)

  // Event listener for hamburger menu click (mobile navigation)
  document.addEventListener('click', function (e) {
      if (e.target.classList.contains('hamburger')) {
          const navLinks = document.querySelector('.nav-links');
          navLinks.classList.toggle('active'); // Toggle the active class to show/hide nav links
      }
  });
});

// Function to initialize the image carousel with auto-slide
function initCarousel() {
  const images = document.querySelectorAll('.carousel-image'); // Select all carousel images
  let current = 0; // Initialize current image index

  // Function to display the image at a given index
  function showImage(index) {
      images.forEach((img, i) => img.classList.remove('active')); // Remove active class from all images
      images[index].classList.add('active'); // Add active class to the current image
  }

  showImage(current); // Show the first image on load

  // Set interval to change images every 5 seconds
  setInterval(() => {
      current = (current + 1) % images.length; // Cycle through images
      showImage(current); // Display the current image
  }, 5000);
}

// Function to setup carousel controls (prev/next buttons and dot indicators)
function setupCarouselControls() {
  const images = document.querySelectorAll('.carousel-image'); // Select all carousel images
  const prevBtn = document.getElementById('prevBtn'); // Select previous button
  const nextBtn = document.getElementById('nextBtn'); // Select next button
  const dotsContainer = document.querySelector('.carousel-dots'); // Select dot indicators container
  let current = 0; // Initialize current image index

  // Function to update the carousel display
  function updateCarousel(index) {
      images.forEach((img, i) => img.classList.remove('active')); // Remove active class from all images
      images[index].classList.add('active'); // Add active class to the current image
      updateDots(index); // Update dot indicators
      document.getElementById('currentImage').textContent = index + 1; // Update current image counter
      document.getElementById('totalImages').textContent = images.length; // Update total images counter
  }

  // Function to update the active dot indicator
  function updateDots(index) {
      document.querySelectorAll('.carousel-dots .dot').forEach((dot, i) => {
          dot.classList[i === index ? 'add' : 'remove']('active'); // Add/remove active class based on index
      });
  }

  // Create dot indicators if the container exists
  if (dotsContainer) {
      images.forEach((_, index) => {
          const dot = document.createElement('div'); // Create a dot element
          dot.classList.add('dot'); // Add dot class
          dot.addEventListener('click', () => { current = index; updateCarousel(current); }); // Add click event listener
          dotsContainer.appendChild(dot); // Append dot to container
      });
      updateDots(current); // Set initial active dot
  }

  // Add event listeners for previous and next buttons
  if (prevBtn) prevBtn.addEventListener('click', () => { current = (current - 1 + images.length) % images.length; updateCarousel(current); });
  if (nextBtn) nextBtn.addEventListener('click', () => { current = (current + 1) % images.length; updateCarousel(current); });

  updateCarousel(current); // Initialize carousel display
}