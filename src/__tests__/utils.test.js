import {
  generateStars,
  filterBooks,
  renderBookCard,
  renderBooks,
  syncSearchInputs,
} from "../utils";

describe("generateStars", () => {
  it("returns 5 filled stars for rating 5", () => {
    expect(generateStars(5)).toBe(
      '<span class="star filled">★</span>'.repeat(5)
    );
  });

  it("returns 3 filled and 2 empty stars for rating 3", () => {
    expect(generateStars(3)).toBe(
      '<span class="star filled">★</span>'.repeat(3) +
        '<span class="star empty">★</span>'.repeat(2)
    );
  });

  it("returns all empty stars for rating 0", () => {
    expect(generateStars(0)).toBe(
      '<span class="star empty">★</span>'.repeat(5)
    );
  });
});

describe("filterBooks", () => {
  const books = [
    { title: "A", author: "B", genre: "C" },
    { title: "D", author: "E", genre: "F" },
    { title: "The Lean Startup", author: "Eric Reis", genre: "Business" },
  ];

  it("filters by title", () => {
    expect(filterBooks(books, "Lean")).toEqual([
      { title: "The Lean Startup", author: "Eric Reis", genre: "Business" },
    ]);
  });
  it("filters by author", () => {
    expect(filterBooks(books, "Eric")).toEqual([
      { title: "The Lean Startup", author: "Eric Reis", genre: "Business" },
    ]);
  });
  it("filters by genre", () => {
    expect(filterBooks(books, "Business")).toEqual([
      { title: "The Lean Startup", author: "Eric Reis", genre: "Business" },
    ]);
  });
  it("returns empty for no match", () => {
    expect(filterBooks(books, "Z")).toEqual([]);
  });
});

describe("renderBookCard", () => {
  const likeKey = "like_Test_Book_Test_Author";

  beforeEach(() => {
    localStorage.clear();
  });

  it("creates a book card element with correct content", () => {
    const book = {
      title: "Test Book",
      author: "Test Author",
      year: 2020,
      genre: "Test Genre",
      rating: 4,
      status: "Available",
      readers: 10,
      likes: 5,
      coverUrl: "test.png",
      labels: "Test",
    };
    const card = renderBookCard(book);

    expect(card).toBeInstanceOf(HTMLElement);
    expect(card.querySelector(".title").textContent).toBe("Test Book");
    expect(card.querySelector(".author").textContent).toContain("Test Author");
    expect(card.querySelector(".genre").textContent).toBe("Test Genre");
    expect(card.querySelector(".status").textContent).toBe("Available");
  });

  it("renders correct initial like state and toggles on click", () => {
    const book = {
      title: "Test Book",
      author: "Test Author",
      year: 2020,
      genre: "Test Genre",
      rating: 4,
      status: "Available",
      readers: 10,
      likes: 5,
      coverUrl: "test.png",
    };
    const card = renderBookCard(book);

    const likeBtn = card.querySelector(".like-btn");
    const likeCount = card.querySelector(".like-count");
    const heartPath = card.querySelector(".heart-path");


    expect(likeBtn).toBeTruthy();
    expect(likeCount).toBeTruthy();
    expect(heartPath).toBeTruthy();

    const initialLikes = parseInt(likeCount.textContent, 10);
    expect(initialLikes).toBe(5);
    expect(heartPath.getAttribute("fill")).toBe("none");


    likeBtn.click();
    expect(heartPath.getAttribute("fill")).toBe("#e74c3c");
    expect(parseInt(likeCount.textContent, 10)).toBe(6);
    expect(localStorage.getItem("like_Test_Book_Test_Author")).toBe("1");

    likeBtn.click();
    expect(heartPath.getAttribute("fill")).toBe("none");
    expect(parseInt(likeCount.textContent, 10)).toBe(5);
    expect(localStorage.getItem("like_Test_Book_Test_Author")).toBe("0");
  });
  

  it("shows already liked state from localStorage", () => {
    localStorage.setItem(likeKey, "1");

    const book = {
      title: "Test Book",
      author: "Test Author",
      year: 2020,
      genre: "Test Genre",
      rating: 4,
      status: "Available",
      readers: 10,
      likes: 5,
      coverUrl: "test.png",
    };
    const card = renderBookCard(book);

    const likeCount = card.querySelector(".like-count");
    const heartPath = card.querySelector(".heart-path");

    expect(parseInt(likeCount.textContent, 10)).toBe(6);
    expect(heartPath.getAttribute("fill")).toBe("#e74c3c");
  });
});


describe("renderBooks", () => {
  let container;
  beforeEach(() => {
    container = document.createElement("div");
  });

  it("renders book cards for each book", () => {
    const books = [
      {
        title: "Book 1",
        author: "A",
        year: 2020,
        genre: "G",
        rating: 4,
        status: "Available",
        readers: 1,
        likes: 2,
        coverUrl: "a.png",
      },
      {
        title: "Book 2",
        author: "B",
        year: 2021,
        genre: "H",
        rating: 3,
        status: "Borrowed Out",
        readers: 2,
        likes: 3,
        coverUrl: "b.png",
      },
    ];
    renderBooks(container, books);
    expect(container.querySelectorAll(".book-card").length).toBe(2);
    expect(container.textContent).toContain("Book 1");
    expect(container.textContent).toContain("Book 2");
  });

  it("renders not-found message if no books", () => {
    renderBooks(container, [], "books", "query");
    expect(container.textContent).toContain(
      "No books found with the search criteria"
    );
    expect(container.textContent).toContain("query");
  });
});

describe("syncSearchInputs", () => {
  it("syncs all search inputs except the active one", () => {
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    const input3 = document.createElement("input");
    input1.value = "foo";
    input2.value = "bar";
    input3.value = "baz";
    const searchInputs = [input1, input2, input3];
    syncSearchInputs(searchInputs, input2, "newval");
    expect(input1.value).toBe("newval");
    expect(input2.value).toBe("bar");
    expect(input3.value).toBe("newval");
  });
});
