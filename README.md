# Photo Grid

A React Native photo gallery app built with Expo, featuring a masonry grid layout, infinite scroll, and progressive image loading.

## Demo

https://github.com/vigneshwaran9494/photo-grid-app/raw/refs/heads/main/demo/demo.mp4

## Features

- Two-column masonry grid layout
- Infinite scroll with pagination
- Progressive image loading with blur hash placeholders
- Dark/light mode support
- Full-screen photo modal
- Optimized performance with FlashList
- Redux Toolkit Query for state management

## Tech Stack

- Expo (React Native)
- TypeScript
- Redux Toolkit with RTK Query
- FlashList & Expo Image
- Unsplash API

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file:
   ```env
   EXPO_PUBLIC_UNSPLASH_API_URL=https://api.unsplash.com/
   EXPO_PUBLIC_UNSPLASH_API_KEY=your_unsplash_api_key_here
   ```

3. Run the app:
   ```bash
   npm start
   ```

## Project Structure

- `app/` - Expo Router pages and navigation
- `components/` - Reusable UI components
- `data/` - API services and Redux store
- `constants/` - App configuration