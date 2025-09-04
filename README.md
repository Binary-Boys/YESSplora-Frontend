# YESSplora Frontend - Campus Treasure Hunt PWA

A cutting-edge Progressive Web Application for an interactive NIT campus treasure hunt game featuring 3D animations, real-time gameplay, team management, Unity game integration, and comprehensive QR-based progression system.

## 🎯 Project Overview

YESSplora is a modern PWA that combines physical campus exploration with digital challenges through Unity WebGL games, creating an immersive treasure hunt experience.

## 🎨 Design System & Color Palette

```css
:root {
  --primary-dark: #590404;    /* Deep burgundy red */
  --primary-accent: #FE4A56;  /* Vibrant coral red */
  --neutral-light: #FFFFFF;   /* Pure white */
  --neutral-dark: #000000;    /* Deep black */
}
```

### Gradient Effects
- **Primary Gradient**: `linear-gradient(135deg, #590404 0%, #FE4A56 100%)`
- **Secondary Gradient**: `linear-gradient(135deg, #FE4A56 0%, #590404 100%)`
- **Dark Gradient**: `linear-gradient(135deg, #000000 0%, #590404 50%, #FE4A56 100%)`

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework**: React 18+ with JavaScript (ES6+)
- **Styling**: Tailwind CSS + Custom CSS for 3D effects
- **3D Graphics**: Three.js for mascot and isometric views
- **Unity Integration**: WebGL builds embedded via iframe/canvas
- **PWA**: Service Worker, Manifest, Offline-first
- **Camera**: WebRTC for QR scanning
- **State**: React Context + LocalStorage
- **Build**: Vite for optimal performance

### Unity Games Integration
- **4 Software Games**: Embedded Unity WebGL builds
- **Seamless Integration**: React-Unity communication bridge
- **Progress Sync**: Unity game completion triggers React state updates
- **Performance Optimization**: Lazy loading and resource management

## 🎮 Unity Games

### Available Games
1. **Code Breaker Challenge** (Level 5)
   - Solve programming puzzles and crack the code
   - Skills: Logic, Problem Solving
   - Estimated Time: 10 minutes

2. **Logic Puzzle Master** (Level 6)
   - Navigate through complex logic mazes
   - Skills: Critical Thinking, Pattern Recognition
   - Estimated Time: 8 minutes

3. **Algorithm Racing** (Level 7)
   - Race against time implementing algorithms
   - Skills: Algorithm Design, Speed Coding
   - Estimated Time: 12 minutes

4. **Data Detective** (Level 8)
   - Analyze data patterns and solve mysteries
   - Skills: Data Analysis, Investigation
   - Estimated Time: 15 minutes

## 🌐 API Endpoints for Django Backend

### Authentication
```javascript
POST /api/auth/register/          // Team registration
POST /api/auth/admin/login/       // Admin login
POST /api/auth/refresh/           // Token refresh
POST /api/auth/logout/            // Logout
```

### Team Management
```javascript
GET    /api/teams/                // List all teams
GET    /api/teams/{id}/           // Get team details
POST   /api/teams/                // Create new team
PUT    /api/teams/{id}/           // Update team
GET    /api/teams/leaderboard/    // Get leaderboard
```

### Game Progress
```javascript
GET    /api/progress/{teamId}/    // Get team progress
PUT    /api/progress/{teamId}/    // Update progress
POST   /api/progress/complete-level/    // Complete level
POST   /api/progress/unity-complete/    // Complete Unity game
```

### QR Code Management
```javascript
POST   /api/qr/validate/          // Validate QR code
POST   /api/qr/scan/              // Scan QR code
GET    /api/qr/team-codes/        // Get team QR codes
GET    /api/qr/stall-codes/       // Get stall QR codes
GET    /api/qr/treasure-codes/    // Get treasure QR codes
```

### Unity Games
```javascript
POST   /api/unity/start/          // Start Unity game
POST   /api/unity/complete/       // Complete Unity game
POST   /api/unity/{gameId}/progress/    // Get game progress
GET    /api/unity/{gameId}/leaderboard/ // Get game leaderboard
```

### Statistics
```javascript
GET    /api/stats/overview/       // Get overview stats
GET    /api/stats/team/{teamId}/  // Get team stats
GET    /api/stats/games/          // Get game stats
```

## 📱 PWA Features

### Service Worker
- Offline functionality
- Caching strategies
- Background sync
- Push notifications

### Manifest
- Standalone app experience
- Custom theme colors
- App shortcuts
- Screenshots for app stores

### Installation
- Add to home screen prompt
- Native app-like experience
- Offline-first architecture

## 🗂️ Project Structure

```
yessplora-frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── sw.js
│   ├── unity-games/
│   │   ├── code-breaker/
│   │   │   └── Build/
│   │   ├── logic-puzzle/
│   │   │   └── Build/
│   │   ├── algorithm-race/
│   │   │   └── Build/
│   │   └── data-detective/
│   │       └── Build/
│   └── qr-codes/
│       ├── teams/
│       ├── stalls/
│       └── treasures/
├── src/
│   ├── components/
│   │   ├── Animation/
│   │   │   └── WelcomeScreen.jsx
│   │   ├── Auth/
│   │   │   ├── AuthScreen.jsx
│   │   │   ├── TeamRegistration.jsx
│   │   │   └── AdminLogin.jsx
│   │   ├── Unity/
│   │   │   ├── UnityGameWrapper.js
│   │   │   └── UnityGamesManager.js
│   │   ├── Map/
│   │   │   ├── CampusMap.jsx
│   │   │   └── HotspotModal.jsx
│   │   ├── QRScanner/
│   │   │   └── QRScannerScreen.js
│   │   ├── Leaderboard/
│   │   │   └── LeaderboardScreen.js
│   │   └── Layout/
│   │       └── MainLayout.js
│   ├── hooks/
│   │   ├── useAuthStore.js
│   │   └── useGameStore.js
│   ├── utils/
│   │   ├── apiClient.js
│   │   ├── gameDataLoader.js
│   │   └── pwaUtils.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── craco.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Unity WebGL builds for games

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yessplora-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add Unity WebGL builds**
   - Place Unity WebGL builds in `public/unity-games/{game-name}/Build/`
   - Ensure each build has `UnityLoader.js` and `{game-name}.json`

4. **Configure environment**
   ```bash
   # Create .env file
   echo "REACT_APP_API_BASE=http://localhost:8000/api" > .env
   ```

5. **Start development server**
   ```bash
   npm start
   ```

### Building for Production

```bash
# Build PWA
npm run build

# Generate service worker
npm run pwa:generate
```

## 🎮 Game Flow

1. **Team Registration**: Teams register with 1-5 members
2. **Physical Challenges**: Complete 4 physical challenges with QR scanning
3. **Unity Games**: Complete 4 Unity software games
4. **Treasure Hunt**: Final treasure hunt with 10 unique QR codes
5. **Leaderboard**: Real-time team rankings

## 🔧 Configuration

### Unity Integration
```javascript
// Unity to React communication
window.ReactUnityBridge = {
  gameComplete: (score) => {
    // Handle game completion
  },
  updateProgress: (progress) => {
    // Update game progress
  }
};
```

### API Configuration
```javascript
const API_BASE = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000/api' 
  : 'https://your-backend.com/api';
```

## 📊 Features

### Core Features
- ✅ Progressive Web App (PWA)
- ✅ Unity WebGL Game Integration
- ✅ QR Code Scanning
- ✅ Real-time Leaderboard
- ✅ Team Management
- ✅ Offline Support
- ✅ Push Notifications
- ✅ 3D Animations
- ✅ Responsive Design

### Game Features
- ✅ 9 Game Levels (4 Physical + 4 Unity + 1 Treasure Hunt)
- ✅ QR Code Validation
- ✅ Point System
- ✅ Progress Tracking
- ✅ Achievement System

### Technical Features
- ✅ Service Worker
- ✅ Web App Manifest
- ✅ Offline Caching
- ✅ Background Sync
- ✅ Token Management
- ✅ Error Handling

## 🛠️ Development

### Available Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run tests
npm run pwa:build  # Build PWA with service worker
npm run pwa:generate # Generate service worker
```

### Code Style
- ESLint configuration included
- Prettier formatting
- Consistent naming conventions

## 🚀 Deployment

### Build Process
1. Run `npm run build`
2. Generate service worker with `npm run pwa:generate`
3. Deploy `build/` folder to web server

### PWA Requirements
- HTTPS required for service worker
- Valid manifest.json
- Service worker registration
- Offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check documentation

---

**YESSplora Frontend** - Bringing campus exploration to life with modern web technologies and Unity integration! 🎮✨
