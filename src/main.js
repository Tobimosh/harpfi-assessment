import "./scss/index.scss";
import {
  generateStars,
  renderBookCard,
  renderBooks,
  syncSearchInputs,
} from "./utils";

import { books } from "./books";

const prevButton = document.createElement("div");
prevButton.className = "flickity-button flickity-prev-next-button previous";
prevButton.innerHTML = `
<img class="flickity-button-icon prev" src="/assets/icons/prev.svg" alt="Previous" />`;

const nextButton = document.createElement("div");
nextButton.className = "flickity-button flickity-prev-next-button next";
nextButton.innerHTML = `
        <img class="flickity-button-icon next" src="/assets/icons/prev.svg" alt="Next" />`;

const featuredCarousel = document.getElementById("featured-carousel");
const recentlyAddedBookList = document.getElementById("recentlyAddedBookList");
const allBookList = document.getElementById("allBookList");
const searchInputs = document.querySelectorAll(".searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");

let currentActiveInput = null;

const carouselWrapper = document.createElement("div");
carouselWrapper.className = "carousel-wrapper";
featuredCarousel.parentNode.insertBefore(carouselWrapper, featuredCarousel);
carouselWrapper.appendChild(featuredCarousel);

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

function renderFeaturedBooks(bookArray, searchParams, carouselWrapper) {
  if (!featuredCarousel) return;

  featuredCarousel.innerHTML = "";

  let currentIndex = 0;
  let cardWidth = 0;
  const totalCards = bookArray.length;
  let isManualScrolling = false;
  const lastScrollPosition = 0;

  const carouselTrack = document.createElement("div");
  carouselTrack.className = "carousel-track";
  featuredCarousel.appendChild(carouselTrack);

  const carousel = document.querySelector(".carousel");
  const featuredBooks = document.querySelector(".featured-books");

  const prevCarouselDots =
    document.getElementsByClassName("flickity-page-dots")[0];

  if (prevCarouselDots) prevCarouselDots.remove();

  const carouselDots = document.createElement("div");
  carouselDots.className = "flickity-page-dots";

  for (let i = 0; i < totalCards; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (i === 0) dot.classList.add("is-selected");
    carouselDots.appendChild(dot);
  }
  carouselWrapper.appendChild(carouselDots);

  if (bookArray.length === 0) {
    if (carouselWrapper.contains(prevButton))
      carouselWrapper.removeChild(prevButton);
    if (carouselWrapper.contains(nextButton))
      carouselWrapper.removeChild(nextButton);

    if (carousel) carousel.classList.add("empty");
    if (featuredBooks) featuredBooks.classList.add("empty");

    featuredCarousel.innerHTML = `<p class="not-found">There's no featured book with the search criteria <strong>"${searchParams}"</strong>.</p>`;

    return;
  } else {
    if (carousel) carousel.classList.remove("empty");
    if (featuredBooks) featuredBooks.classList.remove("empty");
  }

  bookArray.forEach((book, idx) => {
    const cell = document.createElement("div");
    cell.className = "carousel-cell";
    cell.id = `carousel-cell-${idx}`;

    cell.innerHTML = `
            <img
              src="/assets/${book.coverUrl}"
              alt="${book.title}"
            />
            <div class="open-details">
              <div class="circle">
                <div class="circle__dot"></div>
                <div class="circle__dot"></div>
                <div class="circle__dot"></div>
              </div>
            </div>
            <div class="shadow-box"></div>
            <div class="overlay">
              <img
                src="/assets/icons/close-details.svg"
                alt="close-details-icon"
                class="close-details"
              />
              <div class="overlay__content">
                   <p class="status ${
                     book.status === "Available" ? "available" : "borrowed"
                   }">${book.status}</p>
                <div class="title">${book.title}</div>
                <div class="author">${book.author}</div>
                <div class="year">${book.year}</div>
                <div class="info-section">
                  <strong>Genre:</strong> ${book.genre} <br />
                  <strong class="labels">Labels:</strong> ${
                    book.labels || "N/A"
                  }
                </div>
                <div class="rating-container">
                  <div class="rating">
                    <div><strong> Ratings:</strong> ${book.rating}</div>
                    <span class="stars">${generateStars(book.rating)}</span>
                  </div>
                  <div class="stats">
                    <div class="readers">
                      <img
                        src="/assets/icons/group-grey.svg"
                        alt="group-icon"
                      />
                      <span>${book.readers}</span>
                    </div>
                    <div class="likes">
                      <img
                        src="/assets/icons/heart-grey.svg"
                        alt="heart-icon"
                      />
                      <span>${book.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mobile-overlay">
              <img
                src="/assets/icons/close-details.svg"
                alt="close-details-icon"
                class="close-details"
              />
              <div class="mobile-overlay__content">
              <p class="status ${
                book.status === "Available" ? "available" : "borrowed"
              }">${book.status}</p>
                <div class="title">${book.title}</div>
                <div class="author">${book.author}</div>
                <div class="year">${book.year}</div>
                <div class="info-section">
                  <strong>Genre:</strong> ${book.genre} <br />
                  <strong class="labels">Labels:</strong> ${
                    book.labels || "N/A"
                  }
                </div>
                <div class="rating-container">
                  <div class="rating">
                    <div><strong> Ratings:</strong> ${book.rating}</div>
                    <span class="stars">${generateStars(book.rating)}</span>
                  </div>
                  <div class="stats">
                    <div class="readers">
                      <img
                        src="/assets/icons/group-mobile.svg"
                        alt="group-icon"
                      />
                      <span>${book.readers}</span>
                    </div>
                    <div class="likes">
                      <img
                        src="/assets/icons/heart-mobile.svg"
                        alt="heart-icon"
                      />
                      <span>${book.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `;
    carouselTrack.appendChild(cell);

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

  carouselWrapper.appendChild(prevButton);
  carouselWrapper.appendChild(nextButton);

  const firstCard = featuredCarousel.querySelector(".carousel-cell");
  if (firstCard) {
    cardWidth =
      firstCard.offsetWidth +
      Number.parseInt(getComputedStyle(firstCard).marginRight || 0);
  }

  // Make the carousel scrollable
  featuredCarousel.style.overflowX = "auto";
  featuredCarousel.style.scrollBehavior = "smooth";
  featuredCarousel.style.scrollSnapType = "x mandatory";

  // Make each cell a scroll snap point
  const cells = featuredCarousel.querySelectorAll(".carousel-cell");
  cells.forEach((cell) => {
    cell.style.scrollSnapAlign = "start";
  });

  // Hide scrollbar but keep functionality
  featuredCarousel.style.scrollbarWidth = "none";
  featuredCarousel.style.msOverflowStyle = "none";
  const style = document.createElement("style");
  style.textContent = `
    #featured-carousel::-webkit-scrollbar {
      display: none;
    }
  `;
  document.head.appendChild(style);

  // Update dots and buttons based on scroll position
  function updateIndicators() {
    const scrollPosition = featuredCarousel.scrollLeft;
    const viewportWidth = featuredCarousel.clientWidth;
    const maxScroll = featuredCarousel.scrollWidth - viewportWidth;

    // Calculate current index based on scroll position
    currentIndex = Math.round(scrollPosition / cardWidth);
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex >= totalCards) currentIndex = totalCards - 1;

    // Update dots
    const dots = carouselDots.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-selected", index === currentIndex);
    });

    // Update button states
    prevButton.style.opacity = scrollPosition <= 5 ? "0.5" : "1";
    nextButton.style.opacity = scrollPosition >= maxScroll - 5 ? "0.5" : "1";
  }

  // Scroll to a specific index
  function scrollToIndex(index) {
    if (index < 0) index = 0;
    if (index >= totalCards) index = totalCards - 1;

    const scrollPosition = index * cardWidth;
    featuredCarousel.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    currentIndex = index;
    updateIndicators();
  }

  // Handle scroll events
  featuredCarousel.addEventListener("scroll", () => {
    if (!isManualScrolling) {
      updateIndicators();
    }
  });

  // Handle button clicks
  prevButton.addEventListener("click", () => {
    isManualScrolling = true;
    scrollToIndex(currentIndex - 1);
    setTimeout(() => {
      isManualScrolling = false;
    }, 500);
  });

  nextButton.addEventListener("click", () => {
    isManualScrolling = true;
    scrollToIndex(currentIndex + 1);
    setTimeout(() => {
      isManualScrolling = false;
    }, 500);
  });

  // Handle dot clicks
  const dots = carouselDots.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      isManualScrolling = true;
      scrollToIndex(index);
      setTimeout(() => {
        isManualScrolling = false;
      }, 500);
    });
  });

  // Initial update
  updateIndicators();
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
  mobileSuggestions.innerHTML = uniqueSuggestions
    .map((suggestion) => `<p>${suggestion}</p>`)
    .join("");
  searchSuggestions.classList.toggle("hidden", uniqueSuggestions.length === 0);
  mobileSuggestions.classList.toggle("hidden", uniqueSuggestions.length === 0);
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
    q,
    carouselWrapper
  );

  updateSuggestions(filtered);
}

function resetToDefaultView() {
  renderBooks(
    recentlyAddedBookList,
    books.filter((b) => b.isRecentlyAdded)
  );
  renderBooks(allBookList, books);
  renderFeaturedBooks(
    books.filter((b) => b.isFeatured),
    undefined,
    carouselWrapper
  );
  searchSuggestions.classList.add("hidden");
  mobileSuggestions.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  resetToDefaultView();
  const dummySuggestions = [
    `<p>
            <span>Built to Last</span
            ><span class="grey"> - Jim Collins, Jerry I. Porras...</span>
          </p>`,
    `
          <p>
            <span>Four Steps To The Epiphany</span>
            <span class="grey"> - James McEnroe </span>
          </p>
          `,
    `
          <p><span>The Lean Start Up</span> <span>- Eric Reiss</span></p>`,
    `<p class="grey">
            <span>No Excuses</span>
            <span class="grey">- Brian Tracy</span>
          </p>`,
  ];

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
      }
      if (query.length === 0) {
        searchSuggestions.innerHTML = dummySuggestions
          .map((suggestion) => suggestion)
          .join("");
        mobileSuggestions.innerHTML = dummySuggestions
          .map((suggestion) => suggestion)
          .join("");
      }
      searchSuggestions.classList.remove("hidden");
      mobileSuggestions.classList.remove("hidden");
    });

    searchInput.addEventListener("blur", () => {
      searchSuggestions.innerHTML = dummySuggestions
        .map((suggestion) => suggestion)
        .join("");
      mobileSuggestions.innerHTML = dummySuggestions
        .map((suggestion) => suggestion)
        .join("");
      setTimeout(() => {
        searchSuggestions.classList.add("hidden");
        mobileSuggestions.classList.add("hidden");
      }, 200);
    });
  });
});

searchSuggestions.addEventListener("click", (e) => {
  console.log("e.target.innerText");
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

mobileSuggestions.addEventListener("click", (e) => {
  if (e.target.tagName === "P") {
    const selectedValue = e.target.innerText.trim();

    searchInputs.forEach((input) => {
      input.value = selectedValue;
    });

    filterBooks(selectedValue);
    mobileSuggestions.classList.add("hidden");

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
