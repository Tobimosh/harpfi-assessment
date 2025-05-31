# 📚 Korapay Book Club Dashboard

This is a responsive dashboard implementation for the fictional Korapay Book Club application. Built as part of a frontend technical assessment, the interface is designed to replicate the provided Figma mockups using HTML, SCSS, and vanilla JavaScript, with zero frontend frameworks.

---

## 📁 Project Structure

```bash
korapay-dashboard/
├── index.html
├── public/
        assets/
    │   ├── css/
    │   ├── js/
    │   ├── scss/
    │   └── images/
├── lib/        # External libraries (e.g., Flickity)
├── README.md
```

---

## 🚀 Features Implemented

- ✅ Responsive layout for desktop and mobile views.
- ✅ Sticky navigation bar with search functionality.
- ✅ Autocomplete search input with dynamic filtering.
- ✅ Sidebar that collapses into a mobile drawer with hamburger toggle.
- ✅ Featured Books Carousel with:
  - Scroll, swipe, and arrow controls.
  - Overlay details on hover (desktop) or ellipsis click (mobile).
  - Indicator dots.
- ✅ Book Grids/Lists that adapt between grid and list views depending on screen size.
- ✅ Smooth transitions and hover states as shown in the Figma.
- ✅ Search filter behavior replaces book sections dynamically.

---

## 🧑‍💻 How to Run the Project

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd korapay-dashboard
```

### 2. Compile SCSS to CSS

> You must compile the SCSS files before running the project. You can use any method you're comfortable with (Node-sass, Dart Sass, VS Code SCSS plugins, etc.).

**Using Dart Sass (CLI):**

```bash
sass assets/scss:assets/css
```

> Compiled output goes to `assets/css/`.

### 3. Open in Browser

Open `index.html` directly in your browser. No server setup is required.

---

## ⚙️ Assumptions Made

- Book search uses hardcoded data for autocomplete and filtering (as allowed).
- All overlay data is static and locally defined, as no API integration was required.
- Exact colors, shadows, and spacing were replicated as closely as possible using Figma's inspect tools.

---

## ❗Known Issues / Limitations

- No backend or state management is implemented (not required).
- Some edge cases (e.g., empty search queries or multiple overlays open) have been simplified for clarity.

---

## 🔬 Possible Enhancements

- [ ] Add keyboard navigation for autocomplete.
- [ ] Improve focus styles for accessibility.
- [ ] Integrate real book data from an API or JSON feed.
- [ ] Write unit tests for key UI interactions.

---

## 💬 Feedback on the Assessment

- The Figma prototype was clear and interactive, which made implementation smooth.
- A clear spec like this helps focus on both functionality and polish.
- Consider allowing access to downloadable assets (e.g., logos, icons) instead of requiring manual inspection.

---

## 📄 License

Submitted code is owned by Korapay under the terms of the assessment.
