// main.js

// ==== Scroll Shadow on Header ====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ==== Dark Mode Toggle ====
// Get button and body
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Load saved mode from localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
}

// Toggle dark mode and save preference
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});

// ==== Record Collection Data ====
// Array of records — add your records here with title and image path
const records = [
  // Add your records here
  // Example: { title: "Artist – Album Title", image: "./images/your-image.jpg" }
{ title: "The Fall - I'm Frank", image: "./images/TheFall_ImFrank.jpg" },
{ title: "The Fall - I am Kurious Oranj", image: "./images/TheFall_KuriousOranj.jpg" },
{ title: "The Fall - Grotesque (After the Gramme)", image: "./images/TheFall_Grotesque.jpg" },
{ title: "The Fall - Dragnet", image: "./images/The-Fall-Dragnet.jpg" },
{ title: "The Fall - The Wonderful and Frightening Route To the Fall", image: "./images/The-Fall-The-Wonderful-And-Frightening-Route-To.jpg" },
];

// ==== Featured Record Data ====
// This will be updated when user clicks a record
let currentFeaturedRecord = null;

// Load featured record from localStorage on page load
function loadFeaturedRecord() {
  const saved = localStorage.getItem('featuredRecord');
  if (saved) {
    currentFeaturedRecord = JSON.parse(saved);
  }
}

// ==== Render Featured Record Function ====
function renderFeaturedRecord() {
  const container = document.getElementById('featuredRecord');
  container.innerHTML = ''; // Clear existing
  
  if (!currentFeaturedRecord) {
    const emptyMsg = document.createElement('p');
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.color = '#999';
    emptyMsg.textContent = 'Click a record from your collection to feature it here';
    container.appendChild(emptyMsg);
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'featured-record-container';

  // Image
  const img = document.createElement('img');
  img.src = currentFeaturedRecord.image;
  img.alt = currentFeaturedRecord.title + ' cover';
  wrapper.appendChild(img);

  // Content
  const content = document.createElement('div');
  content.className = 'featured-record-content';

  // Title
  const h3 = document.createElement('h3');
  h3.textContent = currentFeaturedRecord.title;
  content.appendChild(h3);

  // Description (if available)
  if (currentFeaturedRecord.description) {
    const p = document.createElement('p');
    p.textContent = currentFeaturedRecord.description;
    content.appendChild(p);
  }

  // Embed (Spotify or YouTube)
  if (currentFeaturedRecord.spotifyEmbed) {
    const iframe = document.createElement('iframe');
    iframe.style.borderRadius = '8px';
    iframe.width = '100%';
    iframe.height = '352';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    iframe.src = currentFeaturedRecord.spotifyEmbed;
    content.appendChild(iframe);
  } else if (currentFeaturedRecord.youtubeEmbed) {
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '315';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.src = currentFeaturedRecord.youtubeEmbed;
    content.appendChild(iframe);
  }

  wrapper.appendChild(content);
  container.appendChild(wrapper);
  
  // Scroll to featured section
  document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
}

// ==== Render Records Function ====
function renderRecords(filter = '') {
  const gallery = document.getElementById('recordGallery');
  gallery.innerHTML = ''; // Clear existing

  // Filter records based on search input (case-insensitive)
  const filtered = records.filter(record =>
    record.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    gallery.innerHTML = '<p>No records found.</p>';
    return;
  }

  // Create card elements for each record
  filtered.forEach(record => {
    const card = document.createElement('div');
    card.className = 'record-card';
    card.style.cursor = 'pointer';

    // Image
    const img = document.createElement('img');
    img.src = record.image;
    img.alt = record.title + ' cover';
    card.appendChild(img);

    // Title
    const h3 = document.createElement('h3');
    h3.textContent = record.title;
    card.appendChild(h3);

    // Click handler to feature the record
    card.addEventListener('click', () => {
      currentFeaturedRecord = record;
      // Save to localStorage so it persists
      localStorage.setItem('featuredRecord', JSON.stringify(record));
      renderFeaturedRecord();
      // Update card styling to show it's featured
      document.querySelectorAll('.record-card').forEach(c => c.classList.remove('featured-card'));
      card.classList.add('featured-card');
    });

    gallery.appendChild(card);
  });
}

// ==== Search input handler ====
const searchInput = document.getElementById('recordSearch');
searchInput.addEventListener('input', () => {
  renderRecords(searchInput.value);
});

// ==== Initial render on page load ====
loadFeaturedRecord();
renderFeaturedRecord();
renderRecords();
