const planetsData = [
  { 
    name: "MERCURY", 
    text: "The smallest planet in our solar system and the nearest to the Sun, Mercury is only slightly larger than Earth's Moon.",
    description: "Mercury has no atmosphere to retain heat, so temperatures vary dramatically from 427°C during the day to -173°C at night.",
    icon: "☿",
    color: "#8C7853"
  },
  { 
    name: "VENUS", 
    text: "Venus is the second planet from the Sun and the hottest planet in our solar system with surface temperatures over 460°C.",
    description: "Often called Earth's twin due to similar size, Venus has a thick, toxic atmosphere that traps heat in a runaway greenhouse effect.",
    icon: "♀",
    color: "#FFC649"
  },
  { 
    name: "EARTH", 
    text: "Our home planet is the only known place in the universe where life exists. Earth has liquid water, a breathable atmosphere, and a magnetic field.",
    description: "Earth is the third planet from the Sun and the fifth largest planet in our solar system. It's the only planet known to support life.",
    icon: "🌍",
    color: "#4F94CD"
  },
  { 
    name: "MARS", 
    text: "Mars is the fourth planet from the Sun and is known as the Red Planet due to iron oxide (rust) on its surface.",
    description: "Mars has the largest volcano in the solar system, Olympus Mons, and evidence suggests it once had liquid water on its surface.",
    icon: "♂",
    color: "#CD5C5C"
  },
  { 
    name: "JUPITER", 
    text: "Jupiter is the largest planet in our solar system. It's a gas giant with a Great Red Spot that's been raging for hundreds of years.",
    description: "Jupiter has 79 known moons, including the four largest: Io, Europa, Ganymede, and Callisto, discovered by Galileo.",
    icon: "♃",
    color: "#DAA520"
  },
  { 
    name: "SATURN", 
    text: "Saturn is best known for its prominent ring system, though all gas giants have rings. It's the second-largest planet in our solar system.",
    description: "Saturn is less dense than water and has 82 known moons, including Titan, which has a thick atmosphere and liquid methane lakes.",
    icon: "♄",
    color: "#FAD5A5"
  }
];

const cardContainer = document.getElementById("cardContainer");
const sidebar = document.getElementById("sidebar");

planetsData.forEach((planet, index) => {
  // Create button
  const btn = document.createElement("button");
  btn.innerHTML = `
    <span class="planet-dot" style="background-color: ${planet.color}"></span>
    <span class="title">${planet.name}</span>
  `;
  btn.addEventListener("click", () => showCard(index));
  sidebar.appendChild(btn);

  // Create card
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="planet-visual">
      <div class="planet-sphere" style="background: radial-gradient(circle at 30% 30%, ${planet.color}aa, ${planet.color}22);">
        <span class="planet-icon-large">${planet.icon}</span>
      </div>
    </div>
    <h2>${planet.name}</h2>
    <p class="planet-description">${planet.text}</p>
    <p class="planet-details">${planet.description}</p>
    <button onclick="alert('Exploring ${planet.name}...')">EXPLORE</button>
  `;
  cardContainer.appendChild(card);
});

const buttons = sidebar.querySelectorAll("button");
const cards = cardContainer.querySelectorAll(".card");
let currentIndex = 0;
let isScrolling = false;

function showCard(index) {
  if (index < 0) index = cards.length - 1;
  if (index >= cards.length) index = 0;
  currentIndex = index;

  buttons.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });

  cards.forEach((card, i) => {
    card.classList.remove("active", "prev", "next");
    if (i === index) {
      card.classList.add("active");
    } else if (i === index - 1 || (index === 0 && i === cards.length - 1)) {
      card.classList.add("prev");
    } else if (i === index + 1 || (index === cards.length - 1 && i === 0)) {
      card.classList.add("next");
    }
  });
}

// Handle mouse wheel scrolling
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  isScrolling = true;
  
  if (e.deltaY > 0) {
    showCard(currentIndex + 1);
  } else {
    showCard(currentIndex - 1);
  }

  setTimeout(() => {
    isScrolling = false;
  }, 800);
});

// Handle keyboard navigation
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    showCard(currentIndex + 1);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    showCard(currentIndex - 1);
  }
});

// Show the first card by default
showCard(0);
