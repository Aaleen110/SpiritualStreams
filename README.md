# Spotify Clone - Frontend Only

A beautiful Spotify clone built with React, TypeScript, and Tailwind CSS. This version uses hardcoded mock data and a simple authentication system, so you can run it without any backend server setup.

## Features

- 🎵 **Music Player**: Full-featured audio player with play/pause, next/previous, and volume controls
- 🏠 **Home Page**: Featured songs, "Made For You" and "Trending" sections
- 📚 **Album Pages**: Detailed album views with track listings
- 💬 **Chat System**: Real-time chat with friends (simulated)
- 👥 **Friends Activity**: See what your friends are listening to
- 🔧 **Admin Dashboard**: Manage songs and albums (mock data)
- 🔐 **Simple Authentication**: Login/logout functionality with mock users
- 🎨 **Modern UI**: Beautiful, responsive design inspired by Spotify
- 📱 **Mobile Responsive**: Works great on all devices

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **Lucide React** for icons
- **Radix UI** for accessible components

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the app in action!

## Authentication

The app includes a simple authentication system:

- **Login**: Use any email and password to sign in
- **Mock Users**: Two pre-configured users (John Doe and Jane Smith)
- **Protected Routes**: Chat and admin features require authentication
- **Admin Access**: Automatically enabled for all authenticated users

## Mock Data

The app uses comprehensive mock data including:

- **18 Songs** from popular artists like The Weeknd, Ed Sheeran, Harry Styles, etc.
- **15 Albums** with proper metadata and cover images
- **5 Users** for the chat system
- **Sample Messages** for the chat functionality
- **Realistic Stats** for the admin dashboard

All data is stored in `src/lib/mockData.ts` and can be easily modified or extended.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── layout/             # Layout components (sidebar, player, etc.)
├── lib/                # Utilities and mock data
├── pages/              # Page components
│   ├── login/          # Authentication pages
│   ├── admin/          # Admin dashboard
│   ├── chat/           # Chat functionality
│   └── home/           # Home page
├── providers/          # Context providers
├── stores/             # Zustand state stores
└── types/              # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Music Player
- Play/pause functionality
- Next/previous track navigation
- Volume control
- Progress bar with seeking
- Current song display

### Home Page
- Featured songs grid
- "Made For You" recommendations
- Trending songs section
- Responsive design

### Album Pages
- Album artwork and metadata
- Track listing with play buttons
- Duration and release date info
- Play entire album functionality

### Chat System
- User list with online status
- Real-time messaging (simulated)
- Message history
- User avatars and activity status

### Admin Dashboard
- Song management (view, delete)
- Album management (view, delete)
- Statistics overview
- Add new songs/albums (mock functionality)

### Friends Activity
- Real-time friend activity feed
- What friends are currently listening to
- Online/offline status indicators

### Authentication
- Simple login form
- User profile dropdown
- Protected routes
- Logout functionality

## Customization

### Adding More Songs
Edit `src/lib/mockData.ts` to add more songs:

```typescript
export const mockSongs: Song[] = [
  // ... existing songs
  {
    _id: "19",
    title: "Your New Song",
    artist: "Your Artist",
    albumId: "1",
    imageUrl: "/cover-images/19.jpg",
    audioUrl: "/songs/19.mp3",
    duration: 180,
    createdAt: "2024-02-02T10:00:00Z",
    updatedAt: "2024-02-02T10:00:00Z",
  },
];
```

### Modifying Admin Status
To change admin access, edit `src/stores/useAuthStore.ts`:

```typescript
// Change this line to false to disable admin access
set({ isAdmin: true });
```

### Adding More Users
To add more mock users, edit `src/stores/useAuthStore.ts`:

```typescript
const mockUsers = [
  // ... existing users
  {
    id: "user_3",
    firstName: "Mike",
    lastName: "Johnson",
    imageUrl: "https://example.com/avatar.jpg",
    email: "mike@example.com",
  },
];
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is for educational purposes. All music and artist names are used for demonstration only.
