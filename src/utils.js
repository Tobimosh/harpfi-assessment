export function generateStars(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    i < rating
      ? '<span class="star filled">★</span>'
      : '<span class="star empty">★</span>'
  ).join("");
}

export function filterBooks(books, query) {
  const q = query.toLowerCase();
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.genre.toLowerCase().includes(q)
  );
}

export function renderBookCard(book) {
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

export function syncSearchInputs(searchInputs, activeInput, value) {
  Array.from(searchInputs).forEach((input) => {
    if (input !== activeInput) {
      input.value = value;
    }
  });
}
