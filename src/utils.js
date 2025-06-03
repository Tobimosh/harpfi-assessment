import {
  renderFeaturedBooks,
  carouselWrapper,
  allBookList,
  recentlyAddedBookList,
} from "./main";
import { books } from "./books";

/**
 * Generates a string of star icons (filled/empty) for a given rating (out of 5).
 * @param {number} rating - The book's rating (1-5)
 * @returns {string} HTML string of star elements
 */
export function generateStars(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    i < rating
      ? '<span class="star filled">★</span>'
      : '<span class="star empty">★</span>'
  ).join("");
}

/**
 * Filters an array of books by a search query (matches title, author, or genre).
 * @param {Array} books - Array of book objects
 * @param {string} query - Search string
 * @returns {Array} Filtered books
 */
export function filterBooks(books, query) {
  const q = query.toLowerCase();
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.genre.toLowerCase().includes(q)
  );
}

/**
 * Creates a DOM element for a single book card, including like button logic.
 * @param {Object} book - Book object
 * @returns {HTMLElement} Book card element
 */
export function renderBookCard(book) {
  // Unique key for localStorage like state
  const likeKey = `like_${book.title.replace(
    /\s+/g,
    "_"
  )}_${book.author.replace(/\s+/g, "_")}`;
  const liked = localStorage.getItem(likeKey) === "1";
  const likesCount = liked ? book.likes + 1 : book.likes;

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
            
              <img src="/assets/icons/group.svg" alt="group-icon"/>
                    <button class="like-btn" aria-label="Like this book">
                <svg class="like-heart${
                  liked ? " liked" : ""
                }" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                  <path class="heart-path" fill="${
                    liked ? "#e74c3c" : "none"
                  }" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572"/>
                </svg>
              </button>
              <div>${book.readers}</div>
              <div class="like-count">${likesCount}</div>
          
          </div>
        </div>
      </div>`;

  // --- Like Button Logic (syncs like state and count, updates all sections) ---
  const likeBtn = bookCard.querySelector(".like-btn");
  const likeCount = bookCard.querySelector(".like-count");
  const likeHeart = bookCard.querySelector(".like-heart");
  if (likeBtn && likeHeart) {
    likeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isLiked = likeHeart.classList.contains("liked");
      if (isLiked) {
        likeHeart.classList.remove("liked");
        likeHeart.querySelector(".heart-path").setAttribute("fill", "none");
        likeCount.textContent = parseInt(likeCount.textContent, 10) - 1;
        localStorage.setItem(likeKey, "0");
      } else {
        likeHeart.classList.add("liked");
        likeHeart.querySelector(".heart-path").setAttribute("fill", "#e74c3c");
        likeCount.textContent = parseInt(likeCount.textContent, 10) + 1;
        localStorage.setItem(likeKey, "1");
      }
      // Rerender all book sections to sync like state
      renderFeaturedBooks(
        books.filter((b) => b.isFeatured),
        undefined,
        carouselWrapper
      );
      renderBooks(allBookList, books, "books");
      renderBooks(
        recentlyAddedBookList,
        books.filter((b) => b.isRecentlyAdded),
        "recently added books"
      );
    });
  }

  return bookCard;
}

/**
 * Renders a list of books into a container. Handles empty state.
 * @param {HTMLElement} container - The DOM element to render into
 * @param {Array} bookArray - Array of book objects
 * @param {string} sectionName - Section label for empty state
 * @param {string} searchParams - Search query for empty state
 */
export function renderBooks(
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

/**
 * Keeps multiple search input fields in sync (desktop/mobile).
 * @param {NodeList|Array} searchInputs - All search input elements
 * @param {HTMLElement} activeInput - The input that triggered the change
 * @param {string} value - The value to sync
 */
export function syncSearchInputs(searchInputs, activeInput, value) {
  Array.from(searchInputs).forEach((input) => {
    if (input !== activeInput) {
      input.value = value;
    }
  });
}

/**
 * Checks if a book is liked by the user (localStorage).
 * @param {Object} book - Book object
 * @returns {boolean} True if liked, false otherwise
 */
export function isBookLiked(book) {
  const likeKey = `like_${book.title.replace(
    /\s+/g,
    "_"
  )}_${book.author.replace(/\s+/g, "_")}`;
  return localStorage.getItem(likeKey) === "1";
}
