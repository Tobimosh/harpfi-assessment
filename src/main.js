import "./scss/index.scss";
import "flickity/css/flickity.css";


const books = [
  {
    title: "The Effective Engineer",
    author: "Edmond Lau",
    year: 2009,
    genre: "Motivational",
    rating: 4,
    status: "Available",
    readers: 31,
    likes: 29,
    coverUrl: "images/effective-engineer.png",
    labels: "Productivity, Career",
    isFeatured: true,
    isRecentlyAdded: true,
  },
  {
    title: "The Lean Startup",
    author: "Eric Reis",
    year: 2005,
    genre: "Motivational",
    rating: 4,
    status: "Available",
    readers: 31,
    likes: 29,
    coverUrl: "images/lean-startup.png",
    labels: "Entrepreneurship, Innovation",
    isFeatured: true,
    isRecentlyAdded: true,
  },
  {
    title: "Effective Python",
    author: "Diomidis Spinellis",
    year: 2010,
    genre: "Motivational",
    rating: 4,
    status: "Available",
    readers: 31,
    likes: 29,
    coverUrl: "images/effective-python.png",
    labels: "Programming, Tips",
    isFeatured: true,
    isRecentlyAdded: true,
  },
  {
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    year: 2014,
    genre: "Motivational",
    rating: 4,
    status: "Available",
    readers: 31,
    likes: 29,
    coverUrl: "images/big-magic.png",
    labels: "Creativity, Inspiration",
    isFeatured: true,
    isRecentlyAdded: true,
  },
  {
    title: "Built To Last",
    author: "Jim Collins, Jerry I. Porras",
    year: 2001,
    genre: "Motivational",
    rating: 4,
    status: "Borrowed Out",
    readers: 31,
    likes: 29,
    coverUrl: "images/built-to-last.png",
    labels: "Creative, Self-help",
    isFeatured: true,
    isRecentlyAdded: false,
  },
];

const featuredCarousel = document.getElementById("featured-carousel");
const recentlyAddedBookList = document.getElementById("recentlyAddedBookList");
const allBookList = document.getElementById("allBookList");
const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");
let flickityInstance = null;

function generateStars(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    i < rating
      ? '<span class="star filled">★</span>'
      : '<span class="star empty">★</span>'
  ).join("");
}

function renderBookCard(book) {
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.innerHTML = `
      <img src="/assets/${book.coverUrl}" alt="${book.title}" class="cover" />
      <div>
        <p class="status ${
          book.status === "Available" ? "available" : "borrowed"
        }">${book.status}</p>
        <h3 class="title">${book.title}</h3>
        <p class="author">${book.author} - ${book.year || "Year Unknown"}</p>
        <p class="genre">${book.genre}</p>
        <div class="rating-container">
          <div class="rating">
            Ratings: ${book.rating}
            <span class="stars">${generateStars(book.rating)}</span>
          </div>
          <div class="stats">
            <div class="readers">
              <img src="/assets/icons/group.svg" alt="group-icon"/>
              <span>${book.readers}</span>
            </div>
            <div class="likes">
              <img src="/assets/icons/heart.svg" alt="heart-icon"/>
              <span>${book.likes}</span>
            </div>
          </div>
        </div>
      </div>`;
  return bookCard;
}

function renderBooks(container, bookArray) {
  container.innerHTML = "";

  if (books.length === 0) {
    container.innerHTML = `<p class="not-found">No ${sectionName} books found.</p>`;
    return;
  }
  bookArray.forEach((book) => {
    container.appendChild(renderBookCard(book));
  });
}

function renderFeaturedBooks(bookArray) {
  if (flickityInstance) {
    flickityInstance.destroy();
    flickityInstance = null;
  }

  featuredCarousel.innerHTML = "";

  if (books.length === 0) {
    carousel.innerHTML = `<p class="not-found">No featured books found.</p>`;
    return;
  }

  bookArray.forEach((book) => {
    const cell = document.createElement("div");
    cell.className = "carousel-cell";
    cell.innerHTML = `
      <img src="/assets/${book.coverUrl}" alt="${book.title}">
      <div class="overlay">
        <div class="overlay__content">
          <p class="status ${
            book.status === "Available" ? "available" : "borrowed"
          }">${book.status}</p>
          <div class="title">${book.title}</div>
          <div class="author">${book.author}</div>
          <div class="year">${book.year}</div>
          <div class="info-section">
            <strong>Genre:</strong> ${book.genre} <br/>
            <strong class="labels">Labels:</strong> ${book.labels || "N/A"}
          </div>
          <div class="rating-container">
            <div class="rating">
              <div><strong> Ratings:</strong> ${book.rating}</div>
              <span class="stars">${generateStars(book.rating)}</span>
            </div>
            <div class="stats">
              <div class="readers">
                <img src="/assets/icons/group-grey.svg" alt="group-icon"/> 
                <span>${book.readers}</span>
              </div>
              <div class="likes">
                <img src="/assets/icons/heart-grey.svg" alt="heart-icon"/> 
                <span>${book.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    featuredCarousel.appendChild(cell);
  });

  setTimeout(() => {
    flickityInstance = new Flickity(featuredCarousel, {
      wrapAround: true,
      pageDots: true,
      prevNextButtons: true,
      draggable: true,
      freeScroll: false,
      cellAlign: "left",
      contain: true,
    });
  }, 50);
}

function updateSuggestions(bookArray) {
  const titles = [...new Set(bookArray.map((b) => b.title))];
  searchSuggestions.innerHTML = titles.map((t) => `<li>${t}</li>`).join("");
  searchSuggestions.classList.toggle("hidden", titles.length === 0);
}

function filterBooks(query) {
  const q = query.toLowerCase();
  const matches = (book) =>
    book.title.toLowerCase().includes(q) ||
    book.author.toLowerCase().includes(q) ||
    book.genre.toLowerCase().includes(q);

  const filtered = books.filter(matches);

  renderBooks(
    recentlyAddedBookList,
    filtered.filter((b) => b.isRecentlyAdded)
  );
  renderBooks(allBookList, filtered);
  renderFeaturedBooks(filtered.filter((b) => b.isFeatured));

  updateSuggestions(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  renderBooks(
    recentlyAddedBookList,
    books.filter((b) => b.isRecentlyAdded)
  );
  renderBooks(allBookList, books);
  renderFeaturedBooks(books.filter((b) => b.isFeatured));
});

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  if (query) {
    filterBooks(query);
  } else {
    renderBooks(
      recentlyAddedBookList,
      books.filter((b) => b.isRecentlyAdded)
    );
    renderBooks(allBookList, books);
    renderFeaturedBooks(books.filter((b) => b.isFeatured));
    searchSuggestions.classList.add("hidden");
  }
});

searchInput.addEventListener("focus", () => {
  const query = searchInput.value.trim();
  if (query) filterBooks(query);
  searchSuggestions.classList.remove("hidden");
});

searchInput.addEventListener("blur", () => {
  setTimeout(() => {
    searchSuggestions.classList.add("hidden");
  }, 200);
});

searchSuggestions.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const title = e.target.innerText.trim();
    searchInput.value = title;
    filterBooks(title);
    searchSuggestions.classList.add("hidden");
  }
});
