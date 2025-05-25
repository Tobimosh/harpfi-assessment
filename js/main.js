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
    title: "Big Magic",
    author: "Elizabeth Gilbert",
    year: 2014,
    genre: "Motivational",
    status: "Available",
    rating: 4,
    readers: 31,
    likes: 29,
    coverUrl: "images/big-magic.png",
    labels: "Creativity, Inspiration",
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
  },
  {
    title: "Built To Last",
    author: "Jim Collins, Jerry I. Porras",
    year: 2001,
    genre: "Motivational",
    labels: "Creative, Self-help",
    rating: 4,
    status: "Borrowed Out",
    readers: 31,
    likes: 29,
    coverUrl: "images/built-to-last.png",
  },
  {
    title: "The Lean Startup",
    author: "Eric Reis",
    year: 2005,
    genre: "Motivational",
    labels: "Entrepreneurship, Innovation",
    rating: 4,
    status: "Available",
    readers: 31,
    likes: 29,
    coverUrl: "images/lean-startup.png",
  },
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
    labels: "Productivity, Career",
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
function generateStars(rating) {
  let starsHtml = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starsHtml += '<span class="star filled">★</span>';
    } else {
      starsHtml += '<span class="star empty">★</span>';
    }
  }
  return starsHtml;
}

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("featured-carousel");

  allBooks.forEach((book) => {
    const cell = document.createElement("div");
    cell.className = "carousel-cell";
    cell.innerHTML = `
          <img src="/assets/${book.coverUrl}" alt="${book.title}">
          <div class="overlay">
            <div class="overlay__content">
                            <p class="status ${
                              book.status === "Available"
                                ? "available"
                                : "borrowed"
                            }">${book.status}</p>
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="year">${book.year}</div>
            
            <div class="info-section">
              <strong>Genre:</strong> ${book.genre} <br/>
                            <strong class="labels">Labels:</strong> ${
                              book.labels
                            }

            </div>
            
                <div class="rating-container">
            <div class="rating">
            <div><strong> Ratings:</strong> ${book.rating}</div>
               
                <span class="stars"> ${generateStars(book.rating)}</span>
              </div>
              <div class="stats">
                <div class="readers">
                <img src="/assets/icons/group-grey.svg" alt="group-icon"/> 
                <span>${book.readers}</span>
                </div>
                  <div class="likes">
                <img src="/assets/icons/heart-grey.svg" alt="heart-icon"/> 
                <span>${book.readers}</span>
                </div>   
              </div>
         </div>
            </div>
          </div>
        `;
    carousel.appendChild(cell);
  });

  setTimeout(() => {
    const Flickity = window.Flickity; // Declare the Flickity variable
    new Flickity(carousel, {
      wrapAround: true,
      pageDots: true,
      prevNextButtons: true,
      draggable: true,
      freeScroll: false,
      cellAlign: "left",
      contain: true,
    });
  }, 100);
});

recentlyAddedBooks.forEach((book) => {
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.innerHTML = `
      <img src="/assets/${book.coverUrl}" alt="${book.title}" class="cover" />
   <div>
  <p class="status ${book.status === "Available" ? "available" : "borrowed"}">
    ${book.status}
  </p>
  <h3 class="title">${book.title}</h3>
  <p class="author">${book.author} - ${book.year || "Year Unknown"}</p>
  <p class="genre">${book.genre}</p>

       <div class="rating-container">
            <div class="rating">
                Ratings: ${book.rating}
                <span class="stars"> ${generateStars(book.rating)}</span>
              </div>
              <div class="stats">
                <div class="readers">
                <img src="/assets/icons/group.svg" alt="group-icon"/> 
                <span>${book.readers}</span>
                </div>
                  <div class="likes">
                <img src="/assets/icons/heart.svg" alt="heart-icon"/> 
                <span>${book.readers}</span>
                </div>   
              </div>
         </div>
</div>

    `;
  recentlyAddedBookList.appendChild(bookCard);
});

allBooks.forEach((book) => {
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";
  bookCard.innerHTML = `
        <img src="/assets/${book.coverUrl}" alt="${book.title}" class="cover" />
         <div>
            <p class="status ${
              book.status === "Available" ? "available" : "borrowed"
            }">${book.status}</p>
            <h3 class="title">${book.title}</h3>
            <p class="author">${book.author} - ${
    book.year || "Year Unknown"
  }</p>
            <p class="genre">${book.genre}</p>
         <div class="rating-container">
            <div class="rating">
                Ratings: ${book.rating}
                <span class="stars"> ${generateStars(book.rating)}</span>
              </div>
              <div class="stats">
                <div class="readers">
                <img src="/assets/icons/group.svg" alt="group-icon"/> 
                <span>${book.readers}</span>
                </div>
                  <div class="likes">
                <img src="/assets/icons/heart.svg" alt="heart-icon"/> 
                <span>${book.readers}</span>
                </div>   
              </div>
         </div>
        </div>

      `;
  allBookList.appendChild(bookCard);
});
