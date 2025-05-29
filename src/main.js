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
const searchInputs = document.querySelectorAll(".searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");

let flickityInstance = null;
let currentActiveInput = null;

window.onload = function () {
  const rightSvg = document.querySelector(
    ".flickity-prev-next-button.next svg"
  );
  if (rightSvg) {
    rightSvg.style.transform = "translateX(-48%) rotate(180deg)";
  }

  const rightArrowPath = "M10,50 L40,50 L80,50 L50,0 L50,100 L80,50 L40,50";
  const leftArrowPath = "M90,50 L60,50 L20,50 L50,0 L50,100 L20,50 L60,50";

  const leftArrow = document.querySelector(
    ".flickity-prev-next-button.previous .arrow"
  );
  const rightArrow = document.querySelector(
    ".flickity-prev-next-button.next .arrow"
  );

  if (leftArrow) {
    leftArrow.setAttribute("d", leftArrowPath);
  }

  if (rightArrow) {
    rightArrow.setAttribute("d", rightArrowPath);
  }
};

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

function renderBooks(
  container,
  bookArray,
  sectionName = "books",
  searchParams
) {
  container.innerHTML = "";

  if (bookArray.length === 0) {
    container.innerHTML = `<p class="not-found">No ${sectionName} found with the search criteria <strong>"${searchParams}"</strong>.</p>`;
    return;
  }

  bookArray.forEach((book) => {
    container.appendChild(renderBookCard(book));
  });
}

function renderFeaturedBooks(bookArray, searchParams) {
  if (flickityInstance) {
    flickityInstance.destroy();
    flickityInstance = null;
  }

  featuredCarousel.innerHTML = "";

  if (bookArray.length === 0) {
    featuredCarousel.innerHTML = `<p class="not-found">There's no featured book with the search criteria <strong>"${searchParams}"</strong>.</p>`;
    return;
  }

  bookArray.forEach((book) => {
    const cell = document.createElement("div");
    cell.className = "carousel-cell";
    cell.innerHTML = `
      <img src="/assets/${book.coverUrl}" alt="${book.title}">
      <div class="open-details">
        <div class="circle">
          <div class="circle__dot"></div>
          <div class="circle__dot"></div>
          <div class="circle__dot"></div>
        </div>
      </div>

      <div class="shadow-box"></div>
      <div class="overlay">
        <img src="/assets/icons/close-details.svg" alt="close-details-icon" class="close-details"/> 
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
      </div>



      <div class="mobile-overlay">
        <img src="/assets/icons/close-details.svg" alt="close-details-icon" class="close-details"/> 
        <div class="mobile-overlay__content">

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
                <img src="/assets/icons/group-mobile.svg" alt="group-icon"/> 
                <span>${book.readers}</span>
              </div>
              <div class="likes">
                <img src="/assets/icons/heart-mobile.svg" alt="heart-icon"/> 
                <span>${book.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    featuredCarousel.appendChild(cell);

    const overlays = cell.querySelectorAll(".overlay, .mobile-overlay");
    const openDetails = cell.querySelector(".open-details");
    const closeButtons = cell.querySelectorAll(".close-details");

    openDetails.addEventListener("click", () => {
      document
        .querySelectorAll(".overlay.active, .mobile-overlay.active")
        .forEach((activeOverlay) => {
          activeOverlay.classList.remove("active");
        });

      overlays.forEach((overlay) => overlay.classList.add("active"));
    });

    closeButtons.forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        overlays.forEach((overlay) => overlay.classList.remove("active"));
      });
    });
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

    attachCarouselEventListeners();
  }, 50);
}

function updateSuggestions(bookArray) {
  const titles = [...new Set(bookArray.map((b) => b.title))];
  const authors = [...new Set(bookArray.map((b) => b.author))];
  const genres = [...new Set(bookArray.map((b) => b.genre))];

  const allSuggestions = [...titles, ...authors, ...genres];
  const uniqueSuggestions = [...new Set(allSuggestions)];

  searchSuggestions.innerHTML = uniqueSuggestions
    .map((suggestion) => `<p>${suggestion}</p>`)
    .join("");
  searchSuggestions.classList.toggle("hidden", uniqueSuggestions.length === 0);
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
    filtered.filter((b) => b.isRecentlyAdded),
    "recently added books",
    q
  );
  renderBooks(allBookList, filtered, "books", q);
  renderFeaturedBooks(
    filtered.filter((b) => b.isFeatured),
    q
  );

  updateSuggestions(filtered);
}

function syncSearchInputs(activeInput, value) {
  searchInputs.forEach((input) => {
    if (input !== activeInput) {
      input.value = value;
    }
  });
}

function resetToDefaultView() {
  renderBooks(
    recentlyAddedBookList,
    books.filter((b) => b.isRecentlyAdded)
  );
  renderBooks(allBookList, books);
  renderFeaturedBooks(books.filter((b) => b.isFeatured));
  searchSuggestions.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  resetToDefaultView();

  searchInputs.forEach((searchInput) => {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();
      currentActiveInput = e.target;

      syncSearchInputs(e.target, e.target.value);

      if (query) {
        filterBooks(query);
      } else {
        resetToDefaultView();
      }
    });

    searchInput.addEventListener("focus", (e) => {
      currentActiveInput = e.target;
      const query = e.target.value.trim();
      if (query) {
        filterBooks(query);
      } else {
        updateSuggestions(books);
      }
      searchSuggestions.classList.remove("hidden");
    });

    searchInput.addEventListener("blur", () => {
      setTimeout(() => {
        searchSuggestions.classList.add("hidden");
      }, 200);
    });
  });
});

searchSuggestions.addEventListener("click", (e) => {
  if (e.target.tagName === "P") {
    const selectedValue = e.target.innerText.trim();

    searchInputs.forEach((input) => {
      input.value = selectedValue;
    });

    filterBooks(selectedValue);
    searchSuggestions.classList.add("hidden");

    if (currentActiveInput) {
      currentActiveInput.focus();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const openBtn = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".close-drawer");
  const overlay = document.querySelector(".overlay");

  openBtn?.addEventListener("click", () => {
    sidebar?.classList.add("open");
    overlay?.classList.remove("hidden");
  });

  closeBtn?.addEventListener("click", () => {
    sidebar?.classList.remove("open");
    overlay?.classList.add("hidden");
  });

  overlay?.addEventListener("click", () => {
    sidebar?.classList.remove("open");
    overlay?.classList.add("hidden");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mobileSearchBar = document.querySelector(".mobile-search-bar");
  const mobileSearchBtn = document.querySelector(".mobile-search-button");
  const closeSearchBar = document.querySelector(".close-search");
  const overlay = document.querySelector(".overlay");

  mobileSearchBtn?.addEventListener("click", () => {
    mobileSearchBar?.classList.add("open");
  });

  closeSearchBar?.addEventListener("click", () => {
    mobileSearchBar?.classList.remove("open");
  });

  overlay?.addEventListener("click", () => {
    mobileSearchBar?.classList.remove("open");
  });
});
