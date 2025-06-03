import "./scss/index.scss";
import {
  generateStars,
  renderBooks,
  syncSearchInputs,
  isBookLiked,
} from "./utils";

import { books, defaultBookSuggestions } from "./books";

const prevButton = document.createElement("div");
prevButton.className = "flickity-button flickity-prev-next-button previous";
prevButton.innerHTML = `
<img class="flickity-button-icon prev" src="/assets/icons/prev.svg" alt="Previous" />`;

const nextButton = document.createElement("div");
nextButton.className = "flickity-button flickity-prev-next-button next";
nextButton.innerHTML = `
        <img class="flickity-button-icon next" src="/assets/icons/prev.svg" alt="Next" />`;

const featuredCarousel = document.getElementById("featured-carousel");
export const recentlyAddedBookList = document.getElementById("recentlyAddedBookList");
export const allBookList = document.getElementById("allBookList");
const searchInputs = document.querySelectorAll(".searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");
const mobileSuggestions = document.getElementById("mobileSuggestions");

export const carouselWrapper = document.createElement("div");
carouselWrapper.className = "carousel-wrapper";
featuredCarousel.parentNode.insertBefore(carouselWrapper, featuredCarousel);
carouselWrapper.appendChild(featuredCarousel);

export function renderFeaturedBooks(bookArray, searchParams, carouselWrapper) {
  if (!featuredCarousel) return;

  featuredCarousel.innerHTML = "";

  let currentIndex = 0;
  let cardWidth = 0;
  const totalCards = bookArray.length;
  let isManualScrolling = false;

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
                      <img
                        src="/assets/icons/group-grey.svg"
                        alt="group-icon"
                      />
                               <button class="like-btn" aria-label="Like this book">
                        <svg class="like-heart${
                          isBookLiked(book) ? " liked" : ""
                        }" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                          <path class="heart-path" fill="${
                            isBookLiked(book) ? "#e74c3c" : "none"
                          }" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"/>
                        </svg>
                      </button>
                      <div>${book.readers}</div>
             
                      <div class="like-count">${
                        isBookLiked(book) ? book.likes + 1 : book.likes
                      }</div>
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
                      <img
                        src="/assets/icons/group-mobile.svg"
                        alt="group-icon"
                      />
                             <button class="like-btn" aria-label="Like this book">
                        <svg class="like-heart${
                          isBookLiked(book) ? " liked" : ""
                        }" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                          <path class="heart-path" fill="${
                            isBookLiked(book) ? "#e74c3c" : "none"
                          }" stroke="#999999" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"/>
                        </svg>
                      </button>
                      <div>${book.readers}</div>
                      <div class="like-count">${
                        isBookLiked(book) ? book.likes + 1 : book.likes
                      }</div>
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

    [".overlay", ".mobile-overlay"].forEach((selector) => {
      const overlay = cell.querySelector(selector);
      if (overlay) {
        const likeBtn = overlay.querySelector(".like-btn");
        const likeCount = overlay.querySelector(".like-count");
        const likeHeart = overlay.querySelector(".like-heart");
        if (likeBtn && likeHeart) {
          likeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const likeKey = `like_${book.title.replace(
              /\s+/g,
              "_"
            )}_${book.author.replace(/\s+/g, "_")}`;
            const isLiked = likeHeart.classList.contains("liked");
            if (isLiked) {
              likeHeart.classList.remove("liked");
              likeHeart
                .querySelector(".heart-path")
                .setAttribute("fill", "none");
              likeCount.textContent = parseInt(likeCount.textContent, 10) - 1;
              localStorage.setItem(likeKey, "0");
            } else {
              likeHeart.classList.add("liked");
              likeHeart
                .querySelector(".heart-path")
                .setAttribute("fill", "#e74c3c");
              likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
              localStorage.setItem(likeKey, "1");
            }
            renderBooks(allBookList, books, "books");
            renderBooks(
              recentlyAddedBookList,
              books.filter((b) => b.isRecentlyAdded),
              "recently added books"
            );
          });
        }
      }
    });
  });

  carouselWrapper.appendChild(prevButton);
  carouselWrapper.appendChild(nextButton);

  const firstCard = featuredCarousel.querySelector(".carousel-cell");
  if (firstCard) {
    const cardStyle = getComputedStyle(firstCard);
    const marginLeft = parseInt(cardStyle.marginLeft || "0", 10);
    const marginRight = parseInt(cardStyle.marginRight || "0", 10);
    cardWidth = firstCard.offsetWidth + marginLeft + marginRight;
  }

  featuredCarousel.style.overflowX = "auto";
  featuredCarousel.style.scrollBehavior = "smooth";
  featuredCarousel.style.scrollSnapType = "x mandatory";

  const cells = featuredCarousel.querySelectorAll(".carousel-cell");
  cells.forEach((cell) => {
    cell.style.scrollSnapAlign = "start";
  });

  featuredCarousel.style.scrollbarWidth = "none";
  featuredCarousel.style.msOverflowStyle = "none";
  const style = document.createElement("style");
  style.textContent = `
  #featured-carousel::-webkit-scrollbar {
    display: none;
  }
`;
  document.head.appendChild(style);

  function updateIndicators() {
    const scrollLeft = featuredCarousel.scrollLeft;
    const maxScrollLeft =
      featuredCarousel.scrollWidth - featuredCarousel.clientWidth;

    let newIndex;

    if (scrollLeft >= maxScrollLeft - 10) {
      newIndex = totalCards - 1;
    } else {
      newIndex = Math.round(scrollLeft / cardWidth);
      newIndex = Math.max(0, Math.min(totalCards - 1, newIndex));
    }

    currentIndex = newIndex;

    const dots = carouselDots.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-selected", index === currentIndex);
    });
  }

  function scrollToIndex(index) {
    index = Math.max(0, Math.min(totalCards - 1, index));

    currentIndex = index;

    const dots = carouselDots.querySelectorAll(".dot");
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-selected", dotIndex === currentIndex);
    });

    let scrollPosition;
    if (index === totalCards - 1) {
      scrollPosition =
        featuredCarousel.scrollWidth - featuredCarousel.clientWidth;
    } else {
      scrollPosition = index * cardWidth;
    }

    featuredCarousel.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }

  featuredCarousel.addEventListener("scroll", () => {
    if (!isManualScrolling) updateIndicators();
  });

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

  updateIndicators();
}

function updateSuggestions(bookArray) {
  const titles = [...new Set(bookArray.map((b) => b.title))];
  const authors = [...new Set(bookArray.map((b) => b.author))];
  const genres = [...new Set(bookArray.map((b) => b.genre))];

  const allSuggestions = [...titles, ...authors, ...genres];
  const uniqueSuggestions = [...new Set(allSuggestions)];

  searchSuggestions.innerHTML = uniqueSuggestions
    .map((suggestion, index) => `<li>${suggestion}</li>`)
    .join("");
  mobileSuggestions.innerHTML = uniqueSuggestions
    .map((suggestion, index) => `<li>${suggestion}</li>`)
    .join("");
  searchSuggestions.classList.toggle("hidden", uniqueSuggestions.length === 0);
  mobileSuggestions.classList.toggle("hidden", uniqueSuggestions.length === 0);
}

function rerenderAllBooks() {
  renderBooks(
    recentlyAddedBookList,
    books.filter((b) => b.isRecentlyAdded),
    "recently added books"
  );
  renderBooks(allBookList, books, "books");
  renderFeaturedBooks(
    books.filter((b) => b.isFeatured),
    undefined,
    carouselWrapper
  );
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
  rerenderAllBooks();

  searchSuggestions.classList.add("hidden");
  mobileSuggestions.classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  resetToDefaultView();

  searchInputs.forEach((searchInput) => {
    console.log(searchInput);
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim();

      syncSearchInputs(e.target, e.target.value);

      if (query.length) {
        filterBooks(query);
      } else {
        resetToDefaultView();
      }
    });

    searchInput.addEventListener("focus", (e) => {
      const query = e.target.value.trim();

      if (query.length) {
        filterBooks(query);
      }
      if (query.length === 0) {
        searchSuggestions.innerHTML = defaultBookSuggestions
          .map((suggestion) => suggestion)
          .join("");
        mobileSuggestions.innerHTML = defaultBookSuggestions
          .map((suggestion) => suggestion)
          .join("");
      }

      searchSuggestions.classList.remove("hidden");
      mobileSuggestions.classList.remove("hidden");
    });

    searchInput.addEventListener("blur", () => {
      searchSuggestions.innerHTML = defaultBookSuggestions
        .map((suggestion) => suggestion)
        .join("");
      mobileSuggestions.innerHTML = defaultBookSuggestions
        .map((suggestion) => suggestion)
        .join("");

      // Adding a small delay to allow click events to fire before hiding
      setTimeout(() => {
        searchSuggestions.classList.add("hidden");
        mobileSuggestions.classList.add("hidden");
      }, 150);
    });
  });

  addlisteners();
});

const addlisteners = () => {
  const freshSearchSuggestions = document.getElementById("searchSuggestions");
  const freshMobileSuggestions = document.getElementById("mobileSuggestions");

  freshSearchSuggestions.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const listItem = e.target.closest("li");
    if (listItem) {
      const selectedValue =
        listItem.getAttribute("data-query") || listItem.textContent.trim();

      searchInputs.forEach((input) => {
        input.value = selectedValue;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      });

      filterBooks(selectedValue);
      freshSearchSuggestions.classList.add("hidden");
      freshMobileSuggestions.classList.add("hidden");
    }
  });

  freshMobileSuggestions.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const listItem = e.target.closest("li");
    if (listItem) {
      const selectedValue =
        listItem.getAttribute("data-query") || listItem.textContent.trim();

      searchInputs.forEach((input) => {
        input.value = selectedValue;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      });

      filterBooks(selectedValue);
      freshSearchSuggestions.classList.add("hidden");
      freshMobileSuggestions.classList.add("hidden");
    }
  });
};

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
