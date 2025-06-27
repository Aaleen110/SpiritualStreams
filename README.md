# Spiritual Streams

A React-based music streaming application built with Vite, TypeScript, and Tailwind CSS.

## Features

- Modern React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Radix UI components
- Zustand for state management
- React Router for navigation

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Zustand
- React Router DOM
- Lucide React Icons

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── skeletons/      # Loading skeleton components
│   └── ui/            # Base UI components
├── layout/            # Layout components
│   └── components/    # Layout-specific components
├── lib/               # Utility functions and helpers
├── pages/             # Page components
│   ├── 404/          # 404 page
│   ├── admin/        # Admin pages
│   ├── album/        # Album pages
│   ├── auth-callback/ # Auth callback pages
│   ├── home/         # Home page
│   └── login/        # Login page
├── providers/         # Context providers
├── stores/           # State management stores
└── types/            # TypeScript type definitions
``` 