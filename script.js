const cardsData = [
  { title: "Card 1", text: "This is the first glowing card." },
  { title: "Card 2", text: "This is the second glowing card." },
  { title: "Card 3", text: "This is the third glowing card." },
  { title: "Card 4", text: "This is the fourth glowing card." },
  { title: "Card 5", text: "This is the fifth glowing card." },
  { title: "Card 6", text: "This is the sixth glowing card." }
];

const cardContainer = document.getElementById("cardContainer");
const sidebar = document.getElementById("sidebar");

cardsData.forEach((data, index) => {
  // Create button
  const btn = document.createElement("button");
  btn.innerHTML = `
    <span class="number">${index + 1}</span>
    <span class="title">${data.title}</span>
  `;
  btn.addEventListener("click", () => showCard(index));
  sidebar.appendChild(btn);

  // Create card
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.text}</p>
    <button onclick="alert('More details coming soon!')">Read More</button>
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
