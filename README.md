# React + Three.js + TypeScript + Vite

A modern 3D web template combining React, Three.js, TypeScript, and Vite for building interactive 3D experiences.

## Features

- **React 18** - Modern React with hooks
- **Three.js** - 3D graphics library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Hot Module Replacement (HMR)** - Instant updates during development

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Project Structure

```
src/
├── Canvas.tsx      # Three.js canvas component with rotating cube demo
├── App.tsx         # Main React component
├── main.tsx        # Entry point
├── App.css         # App styles
├── index.css       # Global styles
└── assets/         # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customizing the 3D Scene

The [Canvas.tsx](src/Canvas.tsx) component contains the Three.js setup. You can modify it to:

- Add more 3D objects
- Change materials and colors
- Add animations and interactions
- Implement camera controls
- Add textures and models

## Learning Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vite.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License

MIT

import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
