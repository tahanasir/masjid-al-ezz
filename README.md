# Masjid Al Ezz Website

A modern, responsive website for Masjid Al Ezz, built to serve the community with prayer times, announcements, and information about the mosque.

## 🚀 Tech Stack

This project is built using modern web technologies:

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd masjid-website
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate the static assets in the `dist` directory.

## 🚀 Deployment

This project is configured for automated deployment to **GitHub Pages** using GitHub Actions.

1.  Required branch: `main`
2.  Workflow file: `.github/workflows/main.yml`
3.  Process: Pushing to `main` triggers a build and deploys the `dist` folder to GitHub Pages.

## 📁 Project Structure

```
src/
├── components/   # Reusable UI components
├── pages/        # Page components (routed views)
├── lib/          # Utility functions and shared helpers
├── assets/       # Static assets (images, fonts, etc.)
├── Router.tsx    # application routing configuration
└── main.tsx      # Application entry point
```

## 📜 Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build locally
- `npm run format`: Format code with Prettier

## 📄 License

This project is licensed under the MIT License.
