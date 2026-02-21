<<<<<<< HEAD
# 🌌 Solar System Explorer
=======
# Solar System Explorer - Setup Guide
<img width="733" height="854" alt="image" src="https://github.com/user-attachments/assets/91160b79-bd63-41b2-8d3f-05a9051c51ee" />


>>>>>>> c0304f92073bd235c84b2b1bcef936871b8fc214

An immersive, fully interactive 3D simulation of the solar system built with React, Three.js, and React Three Fiber.

![Solar System Explorer Demo](demo-placeholder.png) <!-- Add a screenshot or GIF here! -->

## ✨ Features

*   **Interactive 3D Environment:** Navigate through a fully realized 3D model of our solar system.
*   **Realistic Rendering:** Features custom WebGL planet shaders and post-processing glow effects for a highly realistic spatial environment.
*   **Informative Overlays:** Interactive UI overlay providing real-time data on planets, including satellite counters and detailed planetary information.
*   **Sleek Aesthetics:** Modern glassmorphism interface built with Tailwind CSS, accented with subtle scanline and noise effects for a sci-fi feel.
*   **Optimized Performance:** Smooth 60fps rendering of complex geometries like starfields, orbital paths, and the Sun.

## 🛠️ Technologies Used

*   **Core:** React.js, Vite
*   **3D Graphics:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
*   **Shaders/Effects:** Custom WebGL Shaders, Postprocessing (`postprocessing`, `@react-three/postprocessing`)
*   **Styling:** Tailwind CSS, PostCSS, Autoprefixer
*   **State Management:** Zustand (`zustand`)

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/solar-system-explorer.git
    cd solar-system-explorer
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
# or
yarn build
```

The built files will be located in the `dist` directory.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
