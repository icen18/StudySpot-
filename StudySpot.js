const studySpots = [
  {
    id: 1,
    name: "CCS Center Library",
    location: "CCS Building - 3rd Floor",
    badge: "Library",
    image: "images/library.jpg",
    noise: "Quiet",
    wifi: "Excellent",
    wifiText: "150 Mbps",
    outlets: "Many",
    crowd: "Low"
  },
  {
    id: 2,
    name: "Computer Laboratory",
    location: "CCS Building - 4th & 5th Floor",
    badge: "Lab Stations",
    image: "images/computer-lab.jpg",
    noise: "Moderate",
    wifi: "Excellent",
    wifiText: "200 Mbps",
    outlets: "Many",
    crowd: "Medium"
  },
  {
    id: 3,
    name: "Student Lounge",
    location: "CCS Center Building - 1st Floor",
    badge: "Lounge Area",
    image: "images/student-lounge.jpg",
    noise: "Moderate",
    wifi: "Good",
    wifiText: "80 Mbps",
    outlets: "Some",
    crowd: "Medium"
  },
  {
    id: 4,
    name: "Campus Cafeteria",
    location: "CCS Cafeteria",
    badge: "Food & Drinks",
    image: "images/cafeteria.avif",
    noise: "Moderate",
    wifi: "Average",
    wifiText: "40 Mbps",
    outlets: "Some",
    crowd: "High"
  },
  {
    id: 5,
    name: "Engineering Reading Room",
    location: "Engineering Building - 2nd Floor",
    badge: "Quiet Area",
    image: "images/reading.avif",
    noise: "Quiet",
    wifi: "Excellent",
    wifiText: "120 Mbps",
    outlets: "Some",
    crowd: "Low"
  },
  {
    id: 6,
    name: "Campus Garden",
    location: "CCS Outdoor Courtyard",
    badge: "Outdoor",
    image: "images/garden.webp",
    noise: "Quiet",
    wifi: "Average",
    wifiText: "50 Mbps",
    outlets: "Some",
    crowd: "Low"
  }
];

const spotsContainer = document.getElementById('spotsContainer');
const spotsCountEl = document.getElementById('spotsCount');
const filterNoise = document.getElementById('filterNoise');
const filterWifi = document.getElementById('filterWifi');
const filterOutlets = document.getElementById('filterOutlets');
const filterCrowd = document.getElementById('filterCrowd');
const findSpotsBtn = document.getElementById('findSpotsBtn');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');

document.addEventListener('DOMContentLoaded', () => {
  renderSpots(studySpots);

  // Close Bootstrap navbar mobile collapse on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }
});

function renderSpots(spots) {
  if (spotsCountEl) {
    spotsCountEl.textContent = spots.length;
  }

  spotsContainer.innerHTML = spots.map(spot => {
    return `
      <div class="col-12 col-sm-6 col-lg-4">
        <article class="spot-card">
          <div class="spot-image-wrapper">
            <img 
              src="${spot.image}" 
              alt="${spot.name}" 
              class="spot-image" 
              loading="lazy" 
              onerror="this.src='https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80'" 
            />
            <span class="spot-top-badge">${spot.badge}</span>
          </div>

          <div class="spot-body">
            <h3 class="spot-name">${spot.name}</h3>
            <div class="spot-location">${spot.location}</div>

            <div class="spot-specs">
              <div class="spec-pill">Noise: ${spot.noise}</div>
              <div class="spec-pill">Wi-Fi: ${spot.wifiText}</div>
              <div class="spec-pill">Outlets: ${spot.outlets}</div>
              <div class="spec-pill">Crowd: ${spot.crowd}</div>
            </div>
          </div>
        </article>
      </div>
    `;
  }).join('');
}

function applyFilters() {
  const noiseVal = filterNoise.value;
  const wifiVal = filterWifi.value;
  const outletsVal = filterOutlets.value;
  const crowdVal = filterCrowd.value;

  // 1. Try to find exact matches
  const exactMatches = studySpots.filter(spot => {
    const matchNoise = (noiseVal === 'all') || (spot.noise === noiseVal);
    const matchWifi = (wifiVal === 'all') || (spot.wifi === wifiVal);
    const matchOutlets = (outletsVal === 'all') || (spot.outlets === outletsVal);
    const matchCrowd = (crowdVal === 'all') || (spot.crowd === crowdVal);

    return matchNoise && matchWifi && matchOutlets && matchCrowd;
  });

  if (exactMatches.length > 0) {
    renderSpots(exactMatches);
    return;
  }

  // 2. Best-Match fallback to guarantee results on every selection
  const scoredSpots = studySpots.map(spot => {
    let score = 0;
    if (noiseVal !== 'all' && spot.noise === noiseVal) score += 2;
    if (wifiVal !== 'all' && spot.wifi === wifiVal) score += 1.5;
    if (outletsVal !== 'all' && spot.outlets === outletsVal) score += 1;
    if (crowdVal !== 'all' && spot.crowd === crowdVal) score += 1;

    return { spot, score };
  });

  scoredSpots.sort((a, b) => b.score - a.score);

  const highestScore = scoredSpots[0].score;
  const closestMatches = scoredSpots
    .filter(item => item.score >= highestScore - 1 && item.score > 0)
    .map(item => item.spot);

  renderSpots(closestMatches.length > 0 ? closestMatches : studySpots);
}

findSpotsBtn.addEventListener('click', () => {
  applyFilters();
  const targetSection = document.getElementById('spots');
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
});

[filterNoise, filterWifi, filterOutlets, filterCrowd].forEach(select => {
  if (select) {
    select.addEventListener('change', applyFilters);
  }
});

resetFiltersBtn.addEventListener('click', () => {
  filterNoise.value = 'all';
  filterWifi.value = 'all';
  filterOutlets.value = 'all';
  filterCrowd.value = 'all';
  renderSpots(studySpots);
});