// main.js

// ==== Image Handling Utilities ====
// These functions ensure images always display gracefully, even if they fail to load

/**
 * Generates a placeholder image URL for a record
 * Uses a color based on the record title for visual variety
 */
function getPlaceholderImage(record) {
  // Array of colors - each record gets a unique one based on its title
  const colors = [
    '#667eea', '#764ba2', '#f093fb', '#4facfe',
    '#43e97b', '#fa709a', '#fee140', '#30cfd0'
  ];
  
  // Generate a consistent color for this record (same record = same color)
  const hash = record.title.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const colorIndex = Math.abs(hash) % colors.length;
  const color = colors[colorIndex];
  
  // Extract artist and album for display on placeholder
  const parts = record.title.split(' - ');
  const artist = encodeURIComponent(parts[0] || 'Unknown Artist');
  const album = encodeURIComponent(parts[1] || parts[0] || 'Unknown Album');
  
  // Use placehold.co service to generate a nice placeholder
  return `https://placehold.co/400x400/${color.replace('#', '')}/white?text=${artist}%0A${album}&font=roboto`;
}

/**
 * Sets up image error handling for a record card image element
 * This is the magic that makes images always work
 */
function setupImageErrorHandling(img, record) {
  img.onerror = () => {
    // Try placeholder if original image fails
    if (!img.src.includes('placehold.co')) {
      console.warn(`Image failed to load: ${img.src}, using placeholder`);
      img.src = getPlaceholderImage(record);
      img.classList.add('placeholder-image');
    } else {
      // Even placeholder failed (no internet?), use inline SVG
      console.error(`Placeholder also failed for: ${record.title}`);
      img.src = createInlineSVGPlaceholder(record);
    }
  };
  
  // Add loading class for smooth transitions
  img.classList.add('loading');
  img.onload = () => {
    img.classList.remove('loading');
  };
}

/**
 * Creates an inline SVG placeholder as last resort
 * This always works, even offline
 */
function createInlineSVGPlaceholder(record) {
  const parts = record.title.split(' - ');
  const artist = parts[0] || 'Unknown';
  const album = parts[1] || parts[0] || 'Album';
  
  // Create a vinyl record graphic
  // gradientId must be stored once so the <defs> id and fill url() reference match
  const gradientId = `grad-${Math.random().toString(36).slice(2)}`;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill="url(#${gradientId})"/>
      <circle cx="200" cy="200" r="120" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
      <circle cx="200" cy="200" r="80" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
      <circle cx="200" cy="200" r="40" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
      <circle cx="200" cy="200" r="15" fill="white" opacity="0.8"/>
      <text x="200" y="320" font-family="Arial, sans-serif" font-size="16" fill="white" text-anchor="middle" opacity="0.9">${artist.substring(0, 20)}</text>
      <text x="200" y="345" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" opacity="0.7">${album.substring(0, 25)}</text>
    </svg>
  `;
  
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

// ==== Safe localStorage Utilities ====
// Prevents crashes in private browsing or when localStorage is disabled

/**
 * Safely get an item from localStorage
 * Returns null if localStorage is unavailable or key doesn't exist
 */
function safeGetLocalStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn(`localStorage.getItem failed for key "${key}":`, e.message);
    return null;
  }
}

/**
 * Safely set an item in localStorage
 * Returns true on success, false on failure
 */
function safeSetLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn(`localStorage.setItem failed for key "${key}":`, e.message);
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * Returns true on success, false on failure
 */
function safeRemoveLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.warn(`localStorage.removeItem failed for key "${key}":`, e.message);
    return false;
  }
}

// ==== Utility Functions ====

/**
 * Debounce function - delays execution until after wait period of inactivity
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==== Header Scroll Shadow ====
const header = document.querySelector('.header');

const navLinks = document.querySelectorAll('.header a[data-section]');

window.addEventListener('scroll', () => {
  // Header shadow
  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Remove all nav link highlights on load
navLinks.forEach(link => link.classList.remove('active'));

// Only highlight nav link when clicked
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    navLinks.forEach(l => l.classList.remove('active'));
    event.currentTarget.classList.add('active');
  });
});

// ==== Dark Mode Toggle ====
// Get button and body
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Load saved mode from localStorage
if (safeGetLocalStorage('darkMode') === 'enabled') {
  body.classList.add('dark-mode');
}

// Toggle dark mode and save preference
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    safeSetLocalStorage('darkMode', 'enabled');
  } else {
    safeSetLocalStorage('darkMode', 'disabled');
  }
});

// ==== Rotating Quotes ====
const quotes = [
  "In vinyl we trust",
  "Music is life in color",
  "“I'm not a singer—I'm a mouth.” - Johnny Rotten",
  "Spin the soundtrack of your life",
  "“A good LP is a being, it's not a product. It has a life-force, a personality, and a history, just like you and me.” - Iggy Pop",
  "Every record tells a story",
  "Analog soul, digital world",
  "Crate digger's paradise",
  "“Record stores… allow you to privately be in this meditational place where you're flipping through the bins… alone, but not alone at the same time.” - Thurston Moore",
  "Turning tables, turning time",
  "One listen at a time",
  "Wax collector's dream",
  "“If you're going to play it out of tune, then play it out of tune properly.” - Mark E. Smith",
];

let currentQuoteIndex = 0;
const quoteElement = document.getElementById('quote');

function rotateQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  quoteElement.style.animation = 'none';
  // Trigger reflow to restart animation
  void quoteElement.offsetWidth;
  quoteElement.style.animation = 'fadeInOut 6s ease-in-out infinite';
  quoteElement.textContent = quotes[currentQuoteIndex];
}

// Rotate quote every 6 seconds (matches animation duration)
setInterval(rotateQuote, 6000);

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
    label: "Let Them Eat Vinyl - LETV574LP",
    format: "Vinyl, LP",
    country: "UK",
    released: "2020",
    style: "Alternative Rock, Garage Rock, Punk"
  },
  {
    title: "The Fall - Bury!",
    image: "./images/The-Fall-Bury.jpg",
    label: "Domino - RUG 363",
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
    label: "Feral Child Records - FERAL CHILD 27",
    format: "Lathe Cut, 7\", 45 RPM, Shape, Single Sided, Limited Edition, Numbered, Clear",
    country: "UK",
    released: "2024",
    style: "Spoken Word, Public Broadcast"
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
  },
  {
    title: "Essential Logic - Beat Rhythm News",
    image: "./images/Essential-Logic-Beat.jpg",
    label: "Rough Trade - ROUGH 5",
    format: "Vinyl, LP, Album",
    country: "UK",
    released: "1979",
    style: "New Wave, Post-Punk, Experimental Rock"
  },
  {
    title: "Sunn O))) - Sunn O)))",
    image: "./images/Sunn-O-Sunn-O.jpg",
    label: "SubPop - SP1685",
    format: "2 x Vinyl, LP, Album, Limited Edition, Stereo, Pearl Flip",
    country: "Europe",
    released: "2026",
    style: "Doom Metal, Drone, Noise"
  },
  {
    title: "Can - Out Of Reach",
    image: "./images/Can-Out-Of-Reach.jpg",
    label: "Harvest, EMI",
    format: "Vinyl, LP, Album",
    country: "Germany",
    released: "1978",
    style: "Krautrock, Experimental Rock"
  },
  {
    title: "Can - Soon Over Babaluma",
    image: "./images/Can-Soon-Over-Babaluma.jpg",
    label: "Spoon Records",
    format: "Vinyl, LP, Album, Reissue, Remastered, 180g",
    country: "Germany",
    released: "2014",
    style: "Krautrock, Jazz-Rock, Experimental Rock"
  },
  {
    title: "Rohstoff (The Essential Lost Tapes 1968-1976) 2-LP Set",
    image: "./images/Can-Rohstoff.jpg",
    label: "Not On Label (Can)",
    format: "2 x Vinyl, LP, Compilation, Unofficial Release",
    country: "Germany",
    released: "2012",
    style: "Krautrock, Experimental Rock, Avant-Garde"
  },
  {
    title: "Can - Spoon",
    image: "./images/Can-Spoon.jpg",
    label: "United Artists Records",
    format: "Vinyl, 7\", 45 RPM, Single, Stereo",
    country: "Germany",
    released: "1971",
    style: "Krautrock, Theme, Psychedelic Rock, Avant-Garde"
  },
  {
    title: "Martin Rev - Martin Rev",
    image: "./images/Martin-Rev-Martin-Rev.jpg",
    label: "Infidelity",
    format: "Vinyl, LP, Album",
    country: "USA",
    released: "1980",
    style: "Electronic, Synth-Pop, Experimental"
  },
  {
    title: "Prostitute - Attempted Martyr",
    image: "./images/Prostitute-Attempted-Martyr.jpg",
    label: "Mute Records - STUMM 521",
    format: "Vinyl, LP, Album, Limited Edition, Panic Alarm Red",
    country: "Worldwide",
    released: "2026",
    style: "Post-Punk, Noise Rock, Experimental Rock"
  },
  {
    title: "James White & The Blacks - Sax Maniac",
    image: "./images/James-White-The-Blacks-Sax-Maniac.jpg",
    label: "Animal Records",
    format: "Vinyl, LP, Album",
    country: "Europe",
    released: "1982",
    style: "Free Funk, Experimental"
  },
  {
    title: "Lydia Lunch, Marc Hurtado - My Lover The Killer",
    image: "./images/Lydia-Lunch-Marc-Hurtado-My-Lover.jpg",
    label: "Munster Records",
    format: "2 x Vinyl, LP, Album, Record Store Day",
    country: "Europe",
    released: "2016",
    style: "Avant-Garde, Experimental, No Wave"
  },
  {
    title: "The Assembly - Never Never",
    image: "./images/The-Assembly-Never.jpg",
    label: "Mute Records",
    format: "Vinyl, 7\", 45 RPM, Single, Stereo",
    country: "UK",
    released: "1983",
    style: "New Wave, Synth-Pop"
  },
  {
    title: "Chrome - Alien Soundtracks",
    image: "./images/Chrome-Alien-Soundtracks.jpg",
    label: "Cleopatra",
    format: "Vinyl, LP, Album, Limited Edition, Green Translucent",
    country: "USA",
    released: "2007",
    style: "Punk, Psychedelic Rock, Experimental Rock"
  }
];

// ==== Featured Record Data ====
// This will be updated when user clicks a record
let currentFeaturedRecord = null;

// Load featured record from localStorage on page load
function loadFeaturedRecord() {
  const saved = safeGetLocalStorage('featuredRecord');
  if (saved) {
    try {
      currentFeaturedRecord = JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved featured record:', e.message);
      currentFeaturedRecord = null;
    }
  }
}

// ==== Render Featured Record Function ====
// scrollToPick: if true, smoothly scrolls The Pick section into view after rendering
function renderFeaturedRecord(scrollToPick = false) {
  const container = document.getElementById('featuredRecord');
  container.innerHTML = '';

  if (!currentFeaturedRecord) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'featured-record-empty-message';
    emptyMsg.innerHTML = '<p>✨ Select a record from your collection below to feature it here</p>';
    container.appendChild(emptyMsg);
    return;
  }

  // Image — written directly into container, no extra wrapper needed
  const img = document.createElement('img');
  img.src = currentFeaturedRecord.image;
  img.alt = currentFeaturedRecord.title + ' cover';
  setupImageErrorHandling(img, currentFeaturedRecord);
  container.appendChild(img);

  // Content block
  const content = document.createElement('div');
  content.className = 'featured-record-content';

  const h3 = document.createElement('h3');
  h3.textContent = currentFeaturedRecord.title;
  content.appendChild(h3);

  // Record details (label, format, released, style)
  const details = document.createElement('div');
  details.className = 'record-details';
  const detailFields = [
    { key: 'label', label: 'Label' },
    { key: 'format', label: 'Format' },
    { key: 'released', label: 'Released' },
    { key: 'country', label: 'Country' },
    { key: 'style', label: 'Style' },
  ];
  detailFields.forEach(({ key, label }) => {
    if (currentFeaturedRecord[key]) {
      const p = document.createElement('p');
      p.className = 'detail-item';
      p.innerHTML = `<strong>${label}:</strong> ${currentFeaturedRecord[key]}`;
      details.appendChild(p);
    }
  });
  if (details.children.length > 0) content.appendChild(details);

  const clearBtn = document.createElement('button');
  clearBtn.className = 'clear-pick-btn';
  clearBtn.textContent = '✕ Clear Pick';
  clearBtn.addEventListener('click', () => {
    currentFeaturedRecord = null;
    safeRemoveLocalStorage('featuredRecord');
    renderFeaturedRecord();
    document.querySelectorAll('.record-card').forEach(c => c.classList.remove('featured-card'));
  });
  content.appendChild(clearBtn);

  container.appendChild(content);

  if (scrollToPick) {
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
  }
}

// ==== Render Records Function ====
function renderRecords(filter = '') {
  const gallery = document.getElementById('recordGallery');
  gallery.innerHTML = ''; // Clear existing

  // Use displayRecords if sorted, otherwise use original records
  const baseRecords = displayRecords.length > 0 ? displayRecords : records;

  // Apply search filter
  let filtered = baseRecords.filter(record =>
    record.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Apply format filter
  if (activeFormatFilter !== 'all') {
    filtered = filtered.filter(record => {
      const fmt = record.format || '';
      switch (activeFormatFilter) {
        case 'lp':       return fmt.includes('LP') && !fmt.includes('Box Set');
        case '7"':       return fmt.includes('7"');
        case '12"':      return fmt.includes('12"');
        case 'box-set':  return fmt.includes('Box Set');
        default:         return true;
      }
    });
  }

  // Apply decade filter
  if (activeDecadeFilter !== 'all') {
    filtered = filtered.filter(record => {
      const year = parseInt(record.released);
      if (isNaN(year)) return false;
      switch (activeDecadeFilter) {
        case 'pre-1985':   return year < 1985;
        case '1985-2000':  return year >= 1985 && year <= 2000;
        case '2000+':      return year > 2000;
        default:           return true;
      }
    });
  }

  if (filtered.length === 0) {
    gallery.innerHTML = '<p data-testid="no-results">No records found.</p>';
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
    img.loading = 'lazy';
    setupImageErrorHandling(img, record);
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

    if (details.children.length > 0) {
      card.appendChild(details);
    }

    // Click handler to feature the record
    card.addEventListener('click', () => {
      currentFeaturedRecord = record;
      safeSetLocalStorage('featuredRecord', JSON.stringify(record));
      renderFeaturedRecord(true); // scroll to The Pick
      document.querySelectorAll('.record-card').forEach(c => c.classList.remove('featured-card'));
      card.classList.add('featured-card');
    });

    gallery.appendChild(card);
  });
}

// ==== Search input handler ====
const searchInput = document.getElementById('recordSearch');

// Debounced search - waits 300ms after user stops typing
const debouncedSearch = debounce((value) => {
  renderRecords(value);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// ==== Hamburger Menu Toggle ====
const menuToggle = document.getElementById('menuToggle');
const navContainer = document.querySelector('.nav-container');

menuToggle.addEventListener('click', () => {
  navContainer.classList.toggle('open');
});

// Close menu when a nav link is clicked
navContainer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navContainer.classList.remove('open');
  });
});

// ==== Sort Dropdown ====
const sortDropdown = document.getElementById('sortDropdown');
let currentSort = 'default';
let displayRecords = [...records]; // Keep a separate copy for display

function sortRecords(sortType) {
  displayRecords = [...records]; // Always start with original array
  
  switch(sortType) {
    case 'alphabetical':
      displayRecords.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'release-year':
      displayRecords.sort((a, b) => {
        const yearA = parseInt(a.released) || 0;
        const yearB = parseInt(b.released) || 0;
        return yearB - yearA;
      });
      break;
    case 'release-year-old':
      displayRecords.sort((a, b) => {
        const yearA = parseInt(a.released) || 0;
        const yearB = parseInt(b.released) || 0;
        return yearA - yearB;
      });
      break;
    default:
      // Keep original order
      break;
  }
  
  // Re-render with current search filter if any
  renderRecords(searchInput.value);
}

sortDropdown.addEventListener('change', (e) => {
  currentSort = e.target.value;
  sortRecords(currentSort);
});

// ==== Filter State ====
let activeFormatFilter = 'all';
let activeDecadeFilter = 'all';

// ==== Collection Stats Bar ====
function renderCollectionStats() {
  const statsEl = document.getElementById('collectionStats');
  if (!statsEl) return;

  const artists = new Set(records.map(r => r.title.split(' - ')[0].trim()));

  const years = records.map(r => parseInt(r.released)).filter(y => !isNaN(y));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const formatTypes = new Set();
  records.forEach(r => {
    if (!r.format) return;
    if (r.format.includes('Box Set')) { formatTypes.add('Box Set'); return; }
    if (r.format.includes('12"')) formatTypes.add('12"');
    if (r.format.includes('7"')) formatTypes.add('7"');
    if (r.format.includes('LP')) formatTypes.add('LP');
  });

  statsEl.innerHTML =
    `<span class="stat-item"><strong>${records.length}</strong> records</span>` +
    `<span class="stat-divider">·</span>` +
    `<span class="stat-item"><strong>${artists.size}</strong> artists</span>` +
    `<span class="stat-divider">·</span>` +
    `<span class="stat-item"><strong>${minYear}–${maxYear}</strong></span>` +
    `<span class="stat-divider">·</span>` +
    `<span class="stat-item">Formats: <strong>${[...formatTypes].join(', ')}</strong></span>`;
}

// ==== Filter Chips ====
function renderFilterChips() {
  const container = document.getElementById('filterChips');
  if (!container) return;

  const formatChips = [
    { label: 'All',      value: 'all',      group: 'format' },
    { label: 'LP',       value: 'lp',       group: 'format' },
    { label: '7"',       value: '7"',       group: 'format' },
    { label: '12"',      value: '12"',      group: 'format' },
    { label: 'Box Set',  value: 'box-set',  group: 'format' },
  ];

  const decadeChips = [
    { label: 'All Eras',    value: 'all',       group: 'decade' },
    { label: 'Pre-1985',    value: 'pre-1985',  group: 'decade' },
    { label: '1985–2000',   value: '1985-2000', group: 'decade' },
    { label: '2000+',       value: '2000+',     group: 'decade' },
  ];

  container.innerHTML = '';

  // Group labels
  const formatLabel = document.createElement('span');
  formatLabel.className = 'chip-group-label';
  formatLabel.textContent = 'Format:';
  container.appendChild(formatLabel);

  const decadeLabel = document.createElement('span');
  decadeLabel.className = 'chip-group-label chip-group-label--decade';
  decadeLabel.textContent = 'Era:';

  [...formatChips, null, ...decadeChips].forEach(chip => {
    if (chip === null) {
      const sep = document.createElement('span');
      sep.className = 'chip-separator';
      container.appendChild(sep);
      container.appendChild(decadeLabel);
      return;
    }

    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = chip.label;
    btn.dataset.value = chip.value;
    btn.dataset.group = chip.group;

    const isActive = chip.group === 'format'
      ? activeFormatFilter === chip.value
      : activeDecadeFilter === chip.value;
    if (isActive) btn.classList.add('active');

    btn.addEventListener('click', () => {
      if (chip.group === 'format') {
        activeFormatFilter = chip.value;
      } else {
        activeDecadeFilter = chip.value;
      }
      container.querySelectorAll(`.chip[data-group="${chip.group}"]`).forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      renderRecords(searchInput.value);
    });

    container.appendChild(btn);
  });
}

// ==== Random Pick ====
const spinBtn = document.getElementById('spinBtn');
if (spinBtn) {
  spinBtn.addEventListener('click', () => {
    const record = records[Math.floor(Math.random() * records.length)];

    currentFeaturedRecord = record;
    safeSetLocalStorage('featuredRecord', JSON.stringify(record));
    renderFeaturedRecord();

    // Scroll to The Pick section so the result is always visible
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });

    // Flash the container to make the update obvious
    const container = document.getElementById('featuredRecord');
    container.classList.remove('pick-flash');
    void container.offsetWidth; // force reflow so animation restarts
    container.classList.add('pick-flash');
    setTimeout(() => container.classList.remove('pick-flash'), 600);

    // Highlight the matching card in the gallery
    document.querySelectorAll('.record-card').forEach(c => {
      const h3 = c.querySelector('h3');
      c.classList.toggle('featured-card', h3 && h3.textContent === record.title);
    });
  });
}

// ==== Initial render on page load ====
loadFeaturedRecord();
renderFeaturedRecord();
renderCollectionStats();
renderFilterChips();
renderRecords();
