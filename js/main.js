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
// Array of records — add your records here with title, image, and optional details
const records = [
  { 
    title: "The Fall - I'm Frank", 
    image: "./images/TheFall_ImFrank.jpg",
    label: "Cog Sinister - COG 001",
    format: "Vinyl, LP, Album",
    country: "USA",
    released: "1990",
    style: "Post-Punk, Alternative Rock"
  },
  { 
    title: "The Fall - I am Kurious Oranj", 
    image: "./images/TheFall_KuriousOranj.jpg",
    label: "Beggars Banquet - BBQLP 96",
    format: "Vinyl, LP, Album, Reissue, Orange Vinyl",
    country: "UK",
    released: "2018",
    style: "Post-Punk, Alternative Rock"
  },
  { 
    title: "The Fall - Grotesque (After the Gramme)", 
    image: "./images/TheFall_Grotesque.jpg",
    label: "Music On Vinyl - MOVLP3320, BMG - MOVLP3320",
    format: "Vinyl, LP, Album, Limited Edition, Numbered, Reissue, Yellow Translucent Vinyl",
    country: "UK",
    released: "2023",
    style: "Post-Punk, Art-Rock, Experimental Rock"
  },
  { 
    title: "The Fall - Dragnet", 
    image: "./images/The-Fall-Dragnet.jpg",
    label: "BMG - BMGRM067LP, Sanctuary - BMGRM067LP",
    format: "Vinyl, LP, Album, Reissue",
    country: "UK",
    released: "2015",
    style: "New Wave, Punk"
  },
  { 
    title: "The Fall - The Wonderful and Frightening Route To the Fall", 
    image: "./images/The-Fall-The-Wonderful-And-Frightening-Route-To.jpg",
    label: "Beggars Banquet - BBQLP 2133",
    format: "Vinyl, LP, Compilation",
    country: "UK, USA",
    released: "2015",
    style: "Alternative Rock, New Wave"
  },
  { 
    title: "The Fall - Medicine For The Masses (The Rough Trade 7\" Singles Box Set)", 
    image: "./images/The-Fall-Medicine-for-the-masses.jpg",
    label: "BMG - BMGCAT668BOX",
    format: "Vinyl, 7\", 45 RPM, Reissue, Stereo, Blue/White/Gray/Clear, Box Set",
    country: "EU",
    released: "2019",
    style: "Alternative Rock, New Wave"
  },
  {
    title: "The Fall - 50,000 Fall Fans Can't Be Wrong (20 Golden Greats)",
    image: "./images/The-Fall-Fall-Fans.jpg",
    label: "Cherry Red - METV1",
    format: "2 x Vinyl, LP, Compilation, Limited Edition, Reissue, Yellow And Blue Splatter",
    country: "UK",
    released: "2025",
    style: "Post-Punk, New Wave, Alternative Rock"
  },
  {
    title: "The Fall - 458489 A Sides",
    image: "./images/The-Fall-A-sides.jpg",
    label: "Beggars Banquet - BEGA 111",
    format: "Vinyl, LP, Compilation",
    country: "UK",
    released: "1990",
    style: "Alternative Rock, Art Rock, Indie Rock, Post-Punk"
  },
  {
    title: "The Fall - 458489 B Sides",
    image: "./images/The-Fall-B-sides.jpg",
    label: "Beggars Banquet - BEGA 116",
    format: "2 x Vinyl, LP, Compilation",
    country: "UK",
    released: "1990",
    style: "Punk, Garage Rock, Post-Punk"
  },
  {
    title: "The Fall - Living Too Late",
    image: "./images/The-Fall-Living-too-late.jpg",
    label: "Beggars Banquet - BEG 165T",
    format: "Vinyl, 12\", EP, 45 RPM",
    country: "UK",
    released: "1986",
    style: "Post-Punk, Alternative Rock"
  },
  {
    title: "The Fall - This Nation's Saving Grace",
    image: "./images/The-Fall-This-Nations.jpg",
    label: "Beggars Banquet - BEGA 67",
    format: "Vinyl, LP, Album, Stereo, Gatefold Sleeve",
    country: "UK",
    released: "1985",
    style: "Post-Punk, Punk, New Wave"
  },
  {
    title: "The Fall - Live @ Tramps New York 10th September 1994",
    image: "./images/The-Fall-Live-Tramps.jpg",
    label: "Let Them Eat Vinyl - LETV607LP",
    format: "2 x Vinyl, LP",
    country: "UK",
    released: "2020",
    style: "Garage Rock, Punk"
  },
  {
    title: "The Fall - Nord-West Gas",
    image: "./images/The-Fall-Nord-West.jpg",
    label: "FünfUndVierzig - 4520",
    format: "Vinyl, LP, Compilation",
    country: "Germany",
    released: "1986",
    style: "Alternative Rock, Post-Punk"
  },
  {
    title: "The Fall - Oh! Brother",
    image: "./images/The-Fall-Oh-Brother.jpg",
    label: "Beggars Banquet - BEG 110T",
    format: "Vinyl, 12\", EP, 45 RPM",
    country: "UK",
    released: "1984",
    style: "New Wave, Alternative Rock"
  },
  {
    title: "The Fall - How I Wrote 'Elastic Man' / City Hobgoblins",
    image: "./images/The-Fall-How-I-Wrote.jpg",
    label: "Rough Trade - RT 048",
    format: "Vinyl, 7\", Single, 45 RPM",
    country: "UK",
    released: "1980",
    style: "Post-Punk, Experimental Rock" 
  },
  {
    title: "The Fall - Interim",
    image: "./images/The-Fall-Interim.jpg",
    label: "	Let Them Eat Vinyl - LETV574LP",
    format: "Vinyl, LP",
    country: "UK",
    released: "2020",
    style: "Alternative Rock, Garage Rock, Punk"
  },
  {
    title: "The Fall - Bury!",
    image: "./images/The-Fall-Bury.jpg",
    label: "	Domino - RUG 363",
    format: "Vinyl, 7\", 45 RPM, Record Store Day, Single, Limited Edition",
    country: "UK",
    released: "2010",
    style: "Alternative Rock, Punk"
  },
  {
    title: "The Fall - Extricate",
    image: "./images/The-Fall-Extricate.jpg",
    label: "B Phonogram - 842 204-1",
    format: "Vinyl, LP, Album",
    country: "EU",
    released: "1990",
    style: "Alternative Rock"
  },
  {
    title: "The Fall - Fall Heads Roll",
    image: "./images/The-Fall-Fall-Heads-Roll.jpg",
    label: "Narnack Records - NCK 7033",
    format: "2 x Vinyl, LP, Album, White Marbled",
    country: "US",
    released: "2005",
    style: "Alternative Rock, Indie Rock, Post-Punk"
  },
  {
    title: "The Fall - Hex Enduction Hour",
    image: "./images/The-Fall-Hex.jpg",
    label: "	Kamera Records - KAM 005",
    format: "Vinyl, LP, Album",
    country: "UK",
    released: "1982",
    style: "Post-Punk, Experimental Rock"
  },
  {
    title: "The Fall - Rude (All The Time)",
    image: "./images/The-Fall-Rude.jpg",
    label: "Flitwick Records - MK45 1FG",
    format: "Vinyl, 7\", Single, 45 RPM, Limited Edition",
    country: "UK",
    released: "2001",
    style: "Post Punk"
  },
  {
    title: "The Fall - Hip Priest And Kamerads",
    image: "./images/The-Fall-Rip-Priest.jpg",
    label: "Situation Two - SITU 13",
    format: "Vinyl, LP, Compilation, RIP PRIEST edition",
    country: "UK",
    released: "1985",
    style: "Post-Punk, Alternative Rock"
  },
  {
    title: "The Fall - Victoria",
    image: "./images/The-Fall-Victoria.jpg",
    label: "Beggars Banquet - BEG 206",
    format: "Vinyl, 7\", Single, 45 RPM",
    country: "UK",
    released: "1988",
    style: "Post-Punk, Alternative Rock"
  },
  {
    title: "The Fall - Call For Escape Route",
    image: "./images/The-Fall-Call-For.jpg",
    label: "Beggars Banquet - BEG 120",
    format: "Vinyl, 12\", 7\", Single, 45 RPM",
    country: "UK",
    released: "1984",
    style: "Post-Punk, New Wave"
  },
  {
    title: "The Fall - (We Wish You) A Protein Christmas",
    image: "./images/The-Fall-We-Wish.jpg",
    label: "Action Records - TAKE22",
    format: "2 x Vinyl, 7\", 45 RPM, Limited Edition",
    country: "UK",
    released: "2003",
    style: "Post-Punk",
  },
  {
    title: "The Fall - Fall In A Hole",
    image: "./images/The-Fall-In-A-Hole.jpg",
    label: "Flying Nun Records - MARK 1 + 2, Flying Nun Records - Live 1",
    format: "Vinyl, LP, Album, 12\", 45 RPM, EP",
    country: "New Zealand",
    released: "1983",
    style: "New Wave, Post-Punk"
  },
  {
    title: "The Fall - Couldn't Get Ahead / Rollin' Dany",
    image: "./images/The-Fall-Couldnt-Get-Ahead.jpg",
    label: "Beggars Banquet - BEG 134T",
    format: "Vinyl, 12\", EP, 45 RPM, Stereo",
    country: "UK",
    released: "1985",
    style: "Post-Punk, Alternative Rock"
  },
  {
    title: "The Fall - Bingo-Master's Break-Out!",
    image: "./images/The-Fall-Bingo.jpg",
    label: "Step-Forward Records - SF 3",
    format: "Vinyl, 7\", Single, 45 RPM, Stereo",
    country: "UK",
    released: "1978",
    style: "Post-Punk, Punk"
  },
  {
    title: "The Fall - Theme From Sparta F.C. #2",
    image: "./images/The-Fall-SpartaFC.jpg",
    label: "Action Records - TAKE23",
    format: "Vinyl, 7\", 45 RPM, Limited Edition, Stereo",
    country: "UK",
    released: "2004",
    style: "Post-Punk, Alternative Rock"
  },
  {
    title: "The Fall - Fiery Jack",
    image: "./images/The-Fall-Fiery-Jack.jpg",
    label: "Step-Forward Records - SF 13",
    format: "Vinyl, 7\", Single, 45 RPM, Single",
    country: "UK",
    released: "1980",
    style: "Post-Punk, Punk, New Wave"
  },
  {
    title: "The Fall - The Man Whose Head Expanded",
    image: "./images/The-Fall-The-Man.jpg",
    label: "	Rough Trade - R.T. 133",
    format: "Vinyl, 7\", 45 RPM, Single",
    country: "UK",
    released: "1983",
    style: "Post-Punk, Experimental Rock"
  },
  {
    title: "The Fall - Look, Know",
    image: "./images/The-Fall-Look.jpg",
    label: "Kamera Records - ERA 004",
    format: "Vinyl, 7\", Single, 45 RPM",
    country: "UK",
    released: "1982",
    style: "New Wave, Art Rock, Post-Punk"
  },
  {
    title: "The Fall - Lie Dream Of A Casino Soul",
    image: "./images/The-Fall-Lie-Dream.jpg",
    label: "Kamera Records - ERA 001",
    format: "Vinyl, 7\", Single, 45 RPM",
    country: "UK",
    released: "1981",
    style: "Punk, Experimental Rock, New Wave"
  },
  {
    title: "Sonic Youth - All Fall Down",
    image: "./images/Sonic-Youth-All-Fall-Down.jpg",
    label: "Not On Label (Sonic Youth) - none",
    format: "Vinyl, 7\", Unofficial Release",
    country: "UK",
    released: "1988",
    style: "Noise Rock, Experimental Rock"
  },
  {
    title: "Iggy Pop - Blah-Blah-Blah",
    image: "./images/Iggy-Pop-Blah.jpg",
    label: "A&M Records - AMA 5145",
    format: "Vinyl, LP, Album",
    country: "UK",
    released: "1986",
    style: "New Wave, Rock"
  },
  {
    title: "The Monks - Synapsis",
    image: "./images/The-Monks-Synapsis.jpg",
    label: "Crime Records - CR 005",
    format: "Vinyl, LP, Album",
    country: "Italy",
    released: "1989",
    style: "	Punk, Hard Rock"
  },
  {
    title: "The Monks - Bad Habits",
    image: "./images/The-Monks-Bad-Habits.jpg",
    label: "EMI - EMC 3309",
    format: "Vinyl, LP, Album, Stereo",
    country: "UK",
    released: "1979",
    style: "Punk Rock, New Wave"
  },
  {
    title: "The Monks - Black Time",
    image: "./images/The-Monks-Black-Time.jpg",
    label: "	International Polydor Production",
    format: "Vinyl, LP, Album, Reissue, 180g",
    country: "USA",
    released: "2011",
    style: "Garage Rock, Punk Rock, New Wave"
  },
  {
    title: "Monks Of Doom - Soundtrack To The Film : Breakfast On The Beach Of Deception",
    image: "./images/Monks-Of-Doom-Soundtrack.jpg",
    label: "Pitch-A-Tent - PITCH 06",
    format: "Vinyl, LP, Album",
    country: "US",
    released: "1987",
    style: "Alternative Rock, Progressive Rock"
  },
  {
    title: "Prison Affair - Demo",
    image: "./images/Prison-Affair-Demo.jpg",
    label: "Erste Theke Tonträger - ETT-081",
    format: "Vinyl, 7\", Limited Edition, Reissue",
    country: "Germany",
    released: "2025",
    style: "Punk"
  },
  {
    title: "Split System - On The Edge / On The Loose",
    image: "./images/Split-System-On-The-Edge.jpg",
    label: "Drunken Sailor Records - DS186",
    format: "Vinyl, 7\", Purple Opaque",
    country: "UK",
    released: "2025",
    style: "Punk Rock"
  },
  {
    title: "Mark E. Smith - Mark E. Smith Reads The Football Results On Final Score 19.11.05",
    image: "./images/Mark-E-Smith-Final-Score.jpg",
    label: " Feral Child Records - FERAL CHILD 27",
    format: "Lathe Cut, 7\", 45 RPM, Shape, Single Sided, Limited Edition, Numbered, Clear",
    country: "UK",
    released: "2024",
    style: "Spoken Word, Public Broadcast",
  },
  {
    title: "The Foetus All-Nude Revue - Bedrock",
    image: "./images/Foetus-Bedrock.jpg",
    label: "Self Immolation - SELF 13, Some Bizzare",
    format: "Vinyl, 12\", 33 ⅓ RPM, 45 RPM, Stereo",
    country: "UK",
    released: "1987",
    style: "Industrial, Experimental Rock, New Wave"
  },
  {
    title: "Foetus - Halt",
    image: "./images/Foetus-Halt.jpg",
    label: "Ectopic Ents - ECT ENTS 046LP",
    format: "2 x Vinyl, LP, Album, Limited Edition, Stereo, Red/black blend and gray/white blend",
    country: "USA",
    released: "2025",
    style: "Industrial, Experimental Rock, Noise Rock"
  }
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

    // Details container
    const details = document.createElement('div');
    details.className = 'record-details';

    // Add optional fields if they exist
    if (record.label) {
      const labelEl = document.createElement('p');
      labelEl.className = 'detail-item';
      labelEl.innerHTML = '<strong>Label:</strong> ' + record.label;
      details.appendChild(labelEl);
    }

    if (record.format) {
      const formatEl = document.createElement('p');
      formatEl.className = 'detail-item';
      formatEl.innerHTML = '<strong>Format:</strong> ' + record.format;
      details.appendChild(formatEl);
    }

    if (record.country) {
      const countryEl = document.createElement('p');
      countryEl.className = 'detail-item';
      countryEl.innerHTML = '<strong>Country:</strong> ' + record.country;
      details.appendChild(countryEl);
    }

    if (record.released) {
      const releasedEl = document.createElement('p');
      releasedEl.className = 'detail-item';
      releasedEl.innerHTML = '<strong>Released:</strong> ' + record.released;
      details.appendChild(releasedEl);
    }

    if (record.style) {
      const styleEl = document.createElement('p');
      styleEl.className = 'detail-item';
      styleEl.innerHTML = '<strong>Style:</strong> ' + record.style;
      details.appendChild(styleEl);
    }

    if (Object.keys(details.children).length > 0) {
      card.appendChild(details);
    }

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
