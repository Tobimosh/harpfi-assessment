const recentlyAddedBooks = [
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
  },
  {
    title: "Effective Python",
    author: "Diomidis Spinellis",
    year: 0,
    status: "Available",
    genre: "Motivational",
    rating: 4,
    readers: 31,
    likes: 29,
    coverUrl: "images/effective-python.png",
  },
  {
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    year: 2014,
    status: "Available",
    genre: "Motivational",
    rating: 4,
    readers: 31,
    likes: 29,
    coverUrl: "images/big-magic.png",
  },
];

const allBooks = [
  {
    title: "The Effective Engineer",
    author: "Edmond Lau",
    year: 2009,
    genre: "Motivational",
    rating: 4,
    readers: 31,
    status: "Available",
    likes: 29,
    coverUrl: "images/effective-engineer.png",
  },
  {
    title: "Built To Last",
    author: "Eric Reis",
    year: 2005,
    genre: "Motivational",
    rating: 4,
    status: "Borrowed Out",
    readers: 31,
    likes: 29,
    coverUrl: "images/lean-startup.png",
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
  },
  {
    title: "Effective Python",
    author: "Diomidis Spinellis",
    year: 0,
    genre: "Motivational",
    rating: 4,
    status: "Available",
    readers: 31,
    likes: 29,
    coverUrl: "images/effective-python.png",
  },
  {
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    year: 2014,
    genre: "Motivational",
    status: "Available",
    rating: 4,
    readers: 31,
    likes: 29,
    coverUrl: "images/big-magic.png",
  },
];

const featuredBooks = [
  {
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    image: "/assets/images/big-magic.png",
  },
  {
    title: "Effective Python",
    author: "Brett Slatkin",
    image: "/assets/images/effective-python.png",
  },
  {
    title: "Built to Last",
    author: "Jim Collins, Jerry Porras",
    image: "/assets/images/built-to-last.png",
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    image: "/assets/images/lean-startup.png",
  },
  {
    title: "The Effective Engineer",
    author: "Edmond Lau",
    image: "/assets/images/effective-engineer.png",
  },
];

const recentlyAddedBookList = document.getElementById("recentlyAddedBookList");

const allBookList = document.getElementById("allBookList");

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("featured-carousel");

  featuredBooks.forEach((book) => {
    const cell = document.createElement("div");
    cell.className = "carousel-cell";
    cell.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <div class="overlay">
          <div class="title">${book.title}</div>
          <div class="author">${book.author}</div>
        </div>
      `;
    carousel.appendChild(cell);
  });
});

recentlyAddedBooks.forEach((book) => {
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.innerHTML = `
      <img src="/assets/${book.coverUrl}" alt="${book.title}" class="cover" />
      <div>
      <p class="status">${book.status}</p>
      <h3 class="title">${book.title}</h3>
      <p class="author">${book.author} - ${book.year || "Year Unknown"}</p>
      <p class="genre">${book.genre}</p>
      <div class="rating">
        Ratings: ${book.rating}
        <span class="stars">${"★".repeat(book.rating)}${"☆".repeat(
    5 - book.rating
  )}</span>
      </div>
      <div class="stats">
        <span class="readers">👥 ${book.readers}</span>
        <span class="likes">♡ ${book.likes}</span>
      </div>
      </div>
    `;
  recentlyAddedBookList.appendChild(bookCard);
});

allBookList.forEach((book) => {
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.innerHTML = `
        <img src="/assets/${book.coverUrl}" alt="${book.title}" class="cover" />
        <div>
        <p class="status">${book.status}</p>
        <h3 class="title">${book.title}</h3>
        <p class="author">${book.author} - ${book.year || "Year Unknown"}</p>
        <p class="genre">${book.genre}</p>
        <div class="rating">
          Ratings: ${book.rating}
          <span class="stars">${"★".repeat(book.rating)}${"☆".repeat(
    5 - book.rating
  )}</span>
        </div>
        <div class="stats">
          <span class="readers">👥 ${book.readers}</span>
          <span class="likes">♡ ${book.likes}</span>
        </div>
        </div>
      `;
  allBookList.appendChild(bookCard);
});
