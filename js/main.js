const recentlyAddedBooks = [
  {
    title: "The Effective Engineer",
    author: "Edmond Lau",
    year: 2009,
    genre: "Motivational",
    rating: 4,
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
    readers: 31,
    likes: 29,
    coverUrl: "images/effective-python.png",
  },
  {
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    year: 2014,
    genre: "Motivational",
    rating: 4,
    readers: 31,
    likes: 29,
    coverUrl: "images/big-magic.png",
  },
];

const allBooks = [
    
]

const bookList = document.getElementById("bookList");

recentlyAddedBooks.forEach((book) => {
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.innerHTML = `
      <img src="/assets/${book.coverUrl}" alt="${book.title}" class="cover" />
      <div>
      <p class="status">Available</p>
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
  bookList.appendChild(bookCard);
});
