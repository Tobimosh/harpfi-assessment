# 📚 Korapay Book Club Dashboard

This is a responsive dashboard implementation for the fictional **Korapay Book Club** application. It replicates the provided Figma design using **HTML**, **SCSS (Sass)**, and **vanilla JavaScript**, and is built and served using **Vite** for a modern frontend development experience.

---

## 📁 Project Structure

```bash
korapay-dashboard/
├── public/
│   └── assets/           # Static assets like images and icons
├── src/
│   ├── index.html        # Main HTML entry point
│   ├── main.js           # JavaScript entry point
│   └── scss/
│       ├── components/   # Book cards, carousels, overlay styles
│       ├── layout/       # Topnav, sidebar, and layout wrappers
│       └── shared/       # Mixins and global styles
├── package.json
├── README.md
```

---

## 🚀 Features Implemented

- ✅ Fully responsive layout across desktop and mobile.
- ✅ Sticky navigation bar with toggleable search bar (mobile) and always-visible input (desktop).
- ✅ Smart, responsive autocomplete search that filters by **book title**, **author**, or **genre**.
- ✅ Sidebar navigation with collapse/drawer behavior on mobile.
- ✅ Featured books carousel with:
  - Custom-built scrollable and swipeable carousel layout (not using Flickity).
  - Overlay details shown on hover (desktop) or via ellipsis (mobile).
  - Navigation arrows and indicator dots.
- ✅ Book sections (`All Books`, `Recently Added`) with hover and tap overlays.
- ✅ Dynamic filtering that updates all book sections based on search input.

---

## ⚙️ How to Run the Project

> Requires [Node.js](https://nodejs.org/) installed.

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

The project will start on `http://localhost:5173/` or another available port.

> Vite handles SCSS processing and hot module replacement.

---

## 💡 Why Sass?

Sass was used to take advantage of modular class-based styling. It improves code organization with reusable mixins and cleaner component-specific styles. The project uses:

- Component-based SCSS (e.g., `book-card.scss`, `carousel.scss`)
- Layout-specific SCSS (e.g., `sidebar.scss`, `topnav.scss`)
- Shared mixins for consistent styling patterns

---

## ❗ Assumptions / Notes

- Carousel was initially implemented with Flickity but replaced with a custom-built version due to layout limitations.
- Search functionality works dynamically and contextually across:
  - Featured Books
  - All Books
  - Recently Added
- Search suggestions update in real time based on **book name**, **author**, or **genre**.
- All content is static for assessment purposes — no external APIs used.

---

## 🔬 Possible Enhancements

- [ ] Add keyboard navigation support for the search dropdown.
- [ ] Implement ARIA roles for accessibility compliance.
- [ ] Add basic tests using Vitest for UI logic and filter functions.
- [ ] Load book data from JSON or API instead of inline.

---

## 💬 Feedback on the Assessment

- Using Figma's interactive prototype helped visualize responsive behavior effectively.
- Providing downloadable assets (e.g., logos, icons) would streamline setup.
- Allowing flexibility in carousel implementation (beyond Flickity) worked out better in practice.

---

## 📄 License

Submitted code is owned by Korapay under the terms of the assessment.
