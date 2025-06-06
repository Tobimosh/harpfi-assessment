// src/books.js
// Contains the book data and default search suggestions for the Korapay Book Club Dashboard.
// Exports:
//   - books: Array of book objects used throughout the app
//   - defaultBookSuggestions: HTML snippets for search suggestion dropdowns

/**
 * Array of book objects used in the dashboard.
 * Each book contains:
 *   - title, author, year, genre, rating, status, readers, likes, coverUrl, labels
 *   - isFeatured: boolean (for featured section)
 *   - isRecentlyAdded: boolean (for recently added section)
 */
export const books = [
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
    genre: "Business",
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
    genre: "Inspirational",
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
    genre: "Spiritual",
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
    genre: "Business",
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
    genre: "Inspirational",
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
    genre: "Spiritual",
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

/**
 * Default search suggestions (HTML <li> elements) for the search dropdown.
 * Used to provide quick access to popular or example books.
 */
export const defaultBookSuggestions = [
  `<li data-query="built to last">
            <span>Built to Last</span
            ><span class="grey"> - Jim Collins, Jerry I. Porras...</span>
          </li>`,
  `
          <li data-query="four steps to the epiphany">
            <span>Four Steps To The Epiphany</span>
            <span class="grey"> - James McEnroe </span>
          </li>
          `,
  `
          <li data-query="the lean start up"><span>The Lean StartUp</span> <span>- Eric Reiss</span></li>`,
  `<li class="grey" data-query="no excuses">
            <span>No Excuses</span>
            <span class="grey">- Brian Tracy</span>
          </li>`,
];
