# YESSplora - NIT Campus Treasure Hunt PWA

A Progressive Web App (PWA) for the YESSplora campus treasure hunt at NIT. This interactive application allows teams to participate in a campus-wide scavenger hunt with QR code scanning, interactive games, and real-time leaderboards.

## 🌟 Features

- **Team Registration & Authentication**: Secure team registration with admin validation
- **QR Code Scanner**: Camera-based QR code scanning for earning points
- **Interactive Campus Map**: Clickable hotspots for level progression
- **Unity Games Integration**: Embedded Unity games for interactive challenges
- **Real-time Leaderboard**: Live team rankings and progress tracking
- **PWA Capabilities**: Offline support, app-like experience
- **Responsive Design**: Works seamlessly on mobile and desktop devices

## 🚀 Live Demo

Visit the live application: [YESSplora Frontend](https://yourusername.github.io/YESSplora-Frontend)

## 🛠️ Tech Stack

- **Frontend**: React 18, Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Routing**: React Router DOM
- **QR Scanning**: HTML5-QRCode
- **Build Tool**: CRACO
- **PWA**: Workbox
- **Deployment**: GitHub Pages

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/YESSplora-Frontend.git
   cd YESSplora-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎮 Usage

### Team Registration
1. Navigate to the registration page
2. Enter team name and member details
3. Use admin's 7-digit ticket number for validation
4. Complete registration to access the game

### QR Code Scanning
1. Access the QR Scanner from the home page
2. Point camera at QR codes placed around campus
3. Each QR code can only be scanned once per team
4. Earn points for successful scans

### Interactive Games
1. Click on map hotspots to start levels
2. Play embedded Unity games for additional points
3. Complete challenges to progress through levels

### Leaderboard
- View real-time team rankings
- Track progress and points earned
- Monitor completion status

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_GAME_ID=your_game_id_here
```

### Admin Ticket Numbers
Configure valid admin ticket numbers in `src/hooks/useAuthStore.js`:

```javascript
const validAdminTickets = ['1234567', '0000000', '9999999'];
```

## 📱 PWA Features

- **Offline Support**: Works without internet connection
- **App-like Experience**: Install as a native app
- **Push Notifications**: Real-time updates
- **Background Sync**: Sync data when online

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)
The app automatically deploys to GitHub Pages when you push to the main branch.

### Manual Deployment
```bash
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/
│   ├── About/          # About page components
│   ├── Animation/      # Animation and visual effects
│   ├── Auth/          # Authentication components
│   ├── Games/         # Games and challenges
│   ├── Home/          # Home page components
│   ├── Layout/        # Layout components
│   ├── Leaderboard/   # Leaderboard components
│   ├── QRScanner/     # QR code scanning
│   ├── Tutorial/      # Tutorial components
│   └── Unity/         # Unity game integration
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── index.js           # App entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: [Your Name]
- **UI/UX Design**: [Designer Name]
- **Game Integration**: [Unity Developer]
- **Backend Integration**: [Backend Developer]

## 📞 Support

For support and questions:
- Email: support@yessplora.com
- GitHub Issues: [Create an issue](https://github.com/yourusername/YESSplora-Frontend/issues)

---

**YESSplora** - Making campus exploration exciting and interactive! 🎯
