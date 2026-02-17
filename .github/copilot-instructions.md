# React + Three.js + Vite Project

This is a React webpage template with Three.js integration for building interactive 3D web applications.

## Project Dependencies

- React 18
- Three.js (3D graphics library)
- TypeScript
- Vite (build tool)

## Key Components

- **Canvas.tsx** - Three.js canvas component featuring a rotating cube demo with lighting and materials
- **App.tsx** - Main React component that renders the Canvas
- **index.css** - Global styles optimized for full-screen canvas
- **App.css** - App-specific styles

## Development Workflow

1. Run `npm run dev` to start the development server
2. Open `http://localhost:5173` in your browser
3. Edit [Canvas.tsx](../src/Canvas.tsx) to modify the 3D scene
4. The browser will hot-reload changes automatically

## Quick Start Commands

- `npm install` - Install dependencies (already done)
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally

## Extending the 3D Scene

To add more objects, materials, or interactions:

1. Edit [Canvas.tsx](../src/Canvas.tsx)
2. Create new geometry, materials, and meshes
3. Add them to the scene with `scene.add()`
4. Implement custom animations in the animation loop

## Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
