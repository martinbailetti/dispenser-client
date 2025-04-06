# Dispenser Next 14

A project built with **Next.js 14**, using **TypeScript**, **Redux Toolkit**, and a modern toolset for development, testing, and component documentation.

## 🚀 Main Features

- ⚙️ **Next.js 14** with SSR/SSG support.
- 💅 Styling with **Sass**.
- 🧠 State management using **Redux Toolkit** and **React Redux**.
- 📚 Visual component documentation with **Storybook**.
- 🧪 Unit testing with **Jest** and **Testing Library**.
- 🌐 Simple backend with **Express**.
- 📦 Automated version control per build.
- 🛠️ Custom scripts for cleaning and deployment.
- 🔍 Linting and formatting with **ESLint** and **Prettier**.

---

## 📦 Installation

```bash
npm install
```

---

## 🔧 Available Scripts

| Command                   | Description                                              |
|---------------------------|----------------------------------------------------------|
| `npm run dev`             | Starts the Next.js development server                    |
| `npm run build`           | Builds the app for production and cleans up artifacts    |
| `npm run start`           | Starts the app in production mode                        |
| `npm run lint`            | Runs ESLint to detect style issues                       |
| `npm run format`          | Formats code using Prettier                              |
| `npm run test`            | Runs unit tests using Jest                               |
| `npm run storybook`       | Starts Storybook in development mode                     |
| `npm run build-storybook` | Generates the static Storybook build                     |
| `npm run major-version`   | Increments major version and builds                      |
| `npm run minor-version`   | Increments minor version and builds                      |

---

## 🧪 Testing

This app uses **Jest** and **React Testing Library** for unit testing.

```bash
npm run test
```

- Tests run in a `jsdom` environment.
- Test files are located in the `tests/` directory or alongside components.

---

## 📚 Storybook for UI Components

All UI components are documented and developed using **Storybook**.

```bash
npm run storybook
```

To generate a static Storybook build:

```bash
npm run build-storybook
```

---

## 📌 Automated Version Control

This project features automated versioning through custom scripts. Every time a build runs, the project version is incremented:

- `npm run major-version` → Increases major version (X.0.0).
- `npm run minor-version` → Increases minor version (X.Y.0).
- `npm run build`         → Increases patch version (X.Y.Z) by default.

This system is implemented via scripts like `build.js`, `build-major-version.js`, and `build-minor-version.js`.

---

## 📄 License

This project is under a private license.

---

## 🧠 Additional Notes

- Uses `dotenv` for environment variable handling.
- `rimraf` is used to clean up files during build scripts.
- `winston` is used as the logging tool.
