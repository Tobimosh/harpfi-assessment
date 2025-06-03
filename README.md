# 📚 HarpFi Book Club Dashboard

A responsive dashboard for the fictional **HarpFi Book Club**. Built with **HTML**, **SCSS**, and **vanilla JavaScript** using **Vite** for modern frontend tooling. Includes robust search, a custom carousel, and unit tests for core logic.

---

## 📁 Project Structure

```bash
harpfi-dashboard/
├── public/                # Static assets (images, icons)
├── src/
│   ├── index.html         # Main HTML entry point
│   ├── main.js            # JavaScript entry point
│   ├── books.js           # Book data (modularized)
│   ├── utils.js           # Reusable JS utilities
│   ├── __tests__/         # Jest unit tests for utils
│   └── scss/              # SCSS styles (components, layout, shared)
├── package.json
├── .babelrc               # Babel config for Jest+ESM
├── jest.config.cjs        # Jest config (jsdom env, Babel transform)
├── README.md
```

---

## 🚀 How to Run the Project

### 1. **Install dependencies**

```bash
npm install
```

### 2. **Start the development server**

```bash
npm run dev
```

- Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. **Build for production**

```bash
npm run build
```

### 4. **Preview the production build**

```bash
npm run preview
```

---

## 🧪 Running Tests

This project uses **Jest** for unit testing, with **Babel** to support ES module syntax in both source and test files.

- To run all tests:

  ```bash
  npm test
  ```

- Test files are located in `src/__tests__/`.

### **Why Babel?**

- The project uses ES Modules (`import`/`export`) for all source code, which is the standard for modern frontend development.
- Jest runs in Node, which does not natively support ES Modules in all cases.
- **Babel** (with `@babel/preset-env` and `babel-jest`) transpiles ES Modules to CommonJS for Jest, so you can use modern JS everywhere without switching syntax.

---

## 🧩 Code Structure & Key Files

- **src/main.js**: App entry point, DOM logic, event listeners, and carousel/search orchestration.
- **src/books.js**: Exports the books array as a module for easy import and testing.
- **src/utils.js**: Pure utility functions (rendering, filtering, syncing inputs) for reuse and testability.
- **src/**tests**/utils.test.js**: Unit tests for all core utility functions (rendering, filtering, syncing).
- **src/scss/**: Modular SCSS for layout, components, and shared styles.

---

## 📝 Assumptions & Thought Process

- **Carousel**: Built a custom carousel for full control and to match the Figma design, rather than relying on Flickity or other libraries.
- **Search**: Designed to filter by title, author, or genre, updating all book sections and suggestions in real time.
- **Book Data**: Modularized into `books.js` for maintainability and easier testing.
- **Testing**: Focused on pure functions and DOM-manipulating utilities for robust, fast feedback.
- **Babel**: Chosen to allow ES module syntax everywhere, making the codebase modern and consistent.

---

## ❗ Uncovered Requirements

- No backend/API integration (all data is static).
- Accessibility (ARIA roles, keyboard navigation) is not fully implemented.
- No end-to-end (E2E) or integration tests—only unit tests for core logic.

---

## ⚙️ Configuration & Preparation

1. **Install Node.js** (v16+ recommended).
2. **Install dependencies**: `npm install`
3. **Run dev server**: `npm run dev`
4. **Run tests**: `npm test`
5. **Build for production**: `npm run build`

> No additional configuration is needed. Babel and Jest are pre-configured for ES module support.

---

## 🐞 Issues Faced

- **Jest + ES Modules**: Required Babel and custom Jest config to support ES module syntax in both source and test files.
- **Carousel Sync**: Ensuring the carousel, dots, and buttons stayed in sync with both manual scroll and programmatic navigation.
- **Suggestion Dropdown**: Handling nested elements in suggestions required using data attributes for reliable value selection.
- **CSS Scroll Snap**: Achieving smooth, native-feeling carousel behavior required careful use of scroll-snap and event listeners.

---

## 💬 Constructive Feedback

- **Assessment Scope**: The assignment is well-scoped for demonstrating frontend skills, but could benefit from explicit requirements around accessibility and testing.
- **Assets**: Providing all assets (icons, images) in a single downloadable package would streamline setup.
- **Testing Guidance**: A note on expected testing approach (unit vs. integration vs. E2E) would help focus efforts.
- **API Mocking**: Optionally including a mock API or JSON endpoint would allow for more realistic data handling.

---

## 📄 License

Submitted code is owned by Korapay under the terms of the assessment.

---

**If you have any questions or need further clarification, please reach out!**
