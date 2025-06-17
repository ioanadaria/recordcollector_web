// main.js

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
// Array of records — you can add more here
const records = [
  {
    title: "Talking Heads – Remain in Light",
    image: "./resorces/images/R-17157376-1612878458-3283.jpg",
    spotifyEmbed: "https://open.spotify.com/embed/album/3v3omYZJ8xY0kzGcEfJZC2?utm_source=generator",
  },
  {
    title: "Aphex Twin – Selected Ambient Works 85–92",
    image: "./resorces/images/R-17157376-1612878470-5835.jpg",
    youtubeEmbed: "https://www.youtube.com/embed/MBFXJw7n-fU",
  },
  // Add more records as needed
];

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

    // Image
    const img = document.createElement('img');
    img.src = record.image;
    img.alt = record.title + ' cover';
    card.appendChild(img);

    // Title
    const h3 = document.createElement('h3');
    h3.textContent = record.title;
    card.appendChild(h3);

    // Embed (Spotify or YouTube)
    if (record.spotifyEmbed) {
      const iframe = document.createElement('iframe');
      iframe.style.borderRadius = '12px';
      iframe.width = '100%';
      iframe.height = '80';
      iframe.frameBorder = '0';
      iframe.allowFullscreen = true;
      iframe.src = record.spotifyEmbed;
      card.appendChild(iframe);
    } else if (record.youtubeEmbed) {
      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '80';
      iframe.frameBorder = '0';
      iframe.allowFullscreen = true;
      iframe.src = record.youtubeEmbed;
      card.appendChild(iframe);
    }

    gallery.appendChild(card);
  });
}

// ==== Search input handler ====
const searchInput = document.getElementById('recordSearch');
searchInput.addEventListener('input', () => {
  renderRecords(searchInput.value);
});

// ==== Initial render on page load ====
renderRecords();
