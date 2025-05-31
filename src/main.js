import "./scss/index.scss";

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

const carouselWrapper = document.createElement("div");
carouselWrapper.className = "carousel-wrapper";
featuredCarousel.parentNode.insertBefore(carouselWrapper, featuredCarousel);

carouselWrapper.appendChild(featuredCarousel);

// function renderFeaturedBooks(bookArray, searchParams) {
//   featuredCarousel.innerHTML = "";

//   let currentIndex = 0;
//   let cardWidth = 0;
//   let totalCards = bookArray.length;

//   const carouselTrack = document.createElement("div");
//   carouselTrack.className = "carousel-track";
//   featuredCarousel.appendChild(carouselTrack);

//   const prevCarouselDots =
//     document.getElementsByClassName("flickity-page-dots")[0];

//   if (prevCarouselDots) prevCarouselDots.remove();

//   const carouselDots = document.createElement("div");
//   carouselDots.className = "flickity-page-dots";

//   for (let i = 0; i < totalCards; i++) {
//     const dot = document.createElement("div");
//     dot.className = "dot";
//     if (i === 0) dot.classList.add("is-selected");
//     carouselDots.appendChild(dot);
//   }
//   carouselWrapper.appendChild(carouselDots);

//   if (bookArray.length === 0) {
//     carouselWrapper.removeChild(prevButton);
//     carouselWrapper.removeChild(nextButton);
//     featuredCarousel.innerHTML = `<p class="not-found">There's no featured book with the search criteria <strong>"${searchParams}"</strong>.</p>`;
//     return;
//   }

//   bookArray.forEach((book, idx) => {
//     const cell = document.createElement("div");
//     cell.className = "carousel-cell";
//     cell.id = `carousel-cell-${idx}`;

//     cell.innerHTML = `
//             <img
//               src="/assets/${book.coverUrl}"
//               alt="${book.title}"
//             />
//             <div class="open-details">
//               <div class="circle">
//                 <div class="circle__dot"></div>
//                 <div class="circle__dot"></div>
//                 <div class="circle__dot"></div>
//               </div>
//             </div>
//             <div class="shadow-box"></div>
//             <div class="overlay">
//               <img
//                 src="/assets/icons/close-details.svg"
//                 alt="close-details-icon"
//                 class="close-details"
//               />
//               <div class="overlay__content">
//                    <p class="status ${
//                      book.status === "Available" ? "available" : "borrowed"
//                    }">${book.status}</p>
//                 <div class="title">${book.title}</div>
//                 <div class="author">${book.author}</div>
//                 <div class="year">${book.year}</div>
//                 <div class="info-section">
//                   <strong>Genre:</strong> ${book.genre} <br />
//                   <strong class="labels">Labels:</strong> ${
//                     book.labels || "N/A"
//                   }
//                 </div>
//                 <div class="rating-container">
//                   <div class="rating">
//                     <div><strong> Ratings:</strong> ${book.rating}</div>
//                     <span class="stars">${generateStars(book.rating)}</span>
//                   </div>
//                   <div class="stats">
//                     <div class="readers">
//                       <img
//                         src="/assets/icons/group-grey.svg"
//                         alt="group-icon"
//                       />
//                       <span>${book.readers}</span>
//                     </div>
//                     <div class="likes">
//                       <img
//                         src="/assets/icons/heart-grey.svg"
//                         alt="heart-icon"
//                       />
//                       <span>${book.likes}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div class="mobile-overlay">
//               <img
//                 src="/assets/icons/close-details.svg"
//                 alt="close-details-icon"
//                 class="close-details"
//               />
//               <div class="mobile-overlay__content">
//               <p class="status ${
//                 book.status === "Available" ? "available" : "borrowed"
//               }">${book.status}</p>
//                 <div class="title">${book.title}</div>
//                 <div class="author">${book.author}</div>
//                 <div class="year">${book.year}</div>
//                 <div class="info-section">
//                   <strong>Genre:</strong> ${book.genre} <br />
//                   <strong class="labels">Labels:</strong> ${
//                     book.labels || "N/A"
//                   }
//                 </div>
//                 <div class="rating-container">
//                   <div class="rating">
//                     <div><strong> Ratings:</strong> ${book.rating}</div>
//                     <span class="stars">${generateStars(book.rating)}</span>
//                   </div>
//                   <div class="stats">
//                     <div class="readers">
//                       <img
//                         src="/assets/icons/group-mobile.svg"
//                         alt="group-icon"
//                       />
//                       <span>${book.readers}</span>
//                     </div>
//                     <div class="likes">
//                       <img
//                         src="/assets/icons/heart-mobile.svg"
//                         alt="heart-icon"
//                       />
//                       <span>${book.likes}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//     `;
//     // featuredCarousel.appendChild(cell);
//     carouselTrack.appendChild(cell);

//     const overlays = cell.querySelectorAll(".overlay, .mobile-overlay");
//     const openDetails = cell.querySelector(".open-details");
//     const closeButtons = cell.querySelectorAll(".close-details");

//     openDetails.addEventListener("click", () => {
//       document
//         .querySelectorAll(".overlay.active, .mobile-overlay.active")
//         .forEach((activeOverlay) => {
//           activeOverlay.classList.remove("active");
//         });

//       overlays.forEach((overlay) => overlay.classList.add("active"));
//     });

//     closeButtons.forEach((closeBtn) => {
//       closeBtn.addEventListener("click", () => {
//         overlays.forEach((overlay) => overlay.classList.remove("active"));
//       });
//     });
//   });

//   carouselWrapper.appendChild(prevButton);
//   carouselWrapper.appendChild(nextButton);

//   const firstCard = featuredCarousel.querySelector(".carousel-cell");
//   if (firstCard) {
//     cardWidth =
//       firstCard.offsetWidth +
//       parseInt(getComputedStyle(firstCard).marginRight || 0);
//   }

//   const rootEl = document.querySelector(".carousel"); // the scrollable container

//   const lastCard = document.getElementById(`carousel-cell-${totalCards - 1}`);
//   let isLastFullyVisible = false;

//   const obs = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.intersectionRatio >= 0.99) {
//           isLastFullyVisible = true;

//         } else {
//           isLastFullyVisible = false;

//         }
//       });
//     },
//     {
//       root: rootEl,
//       threshold: [0.5, 0.75, 0.99],
//     }
//   );

//   if (lastCard) obs.observe(lastCard);
//   function updateCarousel() {
//     const scrollAmount = currentIndex * cardWidth;
//     carouselTrack.style.transform = `translateX(-${scrollAmount}px)`;

//     const dots = carouselDots.querySelectorAll(".dot");
//     dots.forEach((dot, index) => {
//       dot.classList.toggle("is-selected", index === currentIndex);
//     });

//     prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1";
//     nextButton.style.opacity = currentIndex === totalCards - 1 ? "0.5" : "1";
//   }

//   prevButton.addEventListener("click", () => {
//     if (currentIndex > 0) {
//       currentIndex--;
//       updateCarousel();
//     }
//   });

//   nextButton.addEventListener("click", () => {
//     if (!isLastFullyVisible && currentIndex < totalCards - 1) {
//       currentIndex++;
//       updateCarousel();
//     }
//   });

//   const dots = carouselDots.querySelectorAll(".dot");
//   dots.forEach((dot, index) => {
//     dot.addEventListener("click", () => {
//       currentIndex = index;
//       updateCarousel();
//     });
//   });

//   updateCarousel();
// }

function renderFeaturedBooks(bookArray, searchParams) {
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
    featuredCarousel.innerHTML = `<p class="not-found">There's no featured book with the search criteria <strong>"${searchParams}"</strong>.</p>`;
    return;
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
