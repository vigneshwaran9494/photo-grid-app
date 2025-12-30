# Photo Grid

## Features

- 🖼️ **Masonry Grid Layout** -  two-column grid layout optimized for photos
- ♾️ **Infinite Scroll** - Seamless pagination with automatic loading of more photos
- 🚀 **Performance Optimized** - Built with FlashList for smooth scrolling and efficient rendering
- 🎨 **Progressive Image Loading** - Blur hash placeholders and progressive image loading for better UX
- 🌓 **Dark/Light Mode** - Automatic theme switching based on system preferences
- 📱 **Full Screen Modal** - Tap any photo to view it in full screen with details
- 🔄 **State Management** - Redux Toolkit Query for efficient API state management
- ⚡ **Optimized Caching** - Smart caching strategy to minimize API calls
- 🎯 **TypeScript** - Fully typed for better developer experience
- 📱 **Cross Platform** - Works on iOS, Android, and Web

## Tech Stack

- **Framework**: [Expo](https://expo.dev) (~54.0.30)
- **React Native**: 0.81.5
- **React**: 19.1.0
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) with RTK Query
- **UI Components**: 
  - [FlashList](https://github.com/shopify/flash-list) - High-performance list component
  - [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/) - Optimized image component
- **API**: [Unsplash API](https://unsplash.com/developers)
- **Language**: TypeScript

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (installed globally or via npx)
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio
- Unsplash API key ([Get one here](https://unsplash.com/developers))

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd photo-grid
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_UNSPLASH_API_URL=https://api.unsplash.com/
   EXPO_PUBLIC_UNSPLASH_API_KEY=your_unsplash_api_key_here
   ```

## Running the App

### Start the development server:
```bash
npm start
# or
npx expo start
```

### Run on specific platforms:
```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web
npm run web
```

### Other commands:
```bash
# Lint the code
npm run lint

# Reset project (moves starter code to app-example)
npm run reset-project
```

## Project Structure

```
photo-grid/
├── app/                    # Expo Router pages (file-based routing)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Main photo grid screen
│   │   └── _layout.tsx    # Tab layout configuration
│   ├── modal.tsx          # Full-screen photo modal
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # UI-specific components
│   │   ├── photo-list.tsx        # Main photo grid list
│   │   ├── photo-item.tsx        # Individual photo item
│   │   ├── progressive-image.tsx # Progressive image loader
│   │   └── error-state.tsx       # Error handling component
│   └── themed-*.tsx       # Themed components
├── constants/            # App constants
│   ├── api-endpoints.ts  # API endpoint definitions
│   └── theme.ts          # Theme configuration
├── data/                 # Data layer
│   ├── api/             # API services (RTK Query)
│   │   └── photos-api.ts
│   ├── store/           # Redux store configuration
│   │   └── store.ts
│   └── types/           # TypeScript type definitions
│       └── photos-list-data.ts
├── hooks/               # Custom React hooks
└── assets/              # Images and static assets
```

## Key Components

### PhotoList
The main component that displays photos in a masonry grid. Features:
- Infinite scroll pagination
- Optimized rendering with FlashList
- Loading and error states
- Smart caching to prevent unnecessary refetches

### PhotoItem
Individual photo card component that:
- Displays photo with blur hash placeholder
- Handles tap navigation to full-screen modal
- Optimized for performance with memoization

### ProgressiveImage
Custom image component that:
- Shows blur hash while loading
- Progressively loads from regular to full quality
- Smooth transitions between image states

### Modal Screen
Full-screen photo viewer that:
- Displays high-quality image
- Shows photo description and author
- Smooth navigation and animations

## API Integration

The app uses the Unsplash API to fetch photos. The integration is handled through Redux Toolkit Query with:

- **Automatic caching** - Photos are cached to reduce API calls
- **Pagination support** - Efficiently loads photos page by page
- **Merge strategy** - Combines pages into a single cache entry
- **Error handling** - Graceful error states and retry logic

### API Endpoints Used:
- `GET /photos` - Fetch paginated list of photos
- `GET /photos/:id` - Fetch individual photo details