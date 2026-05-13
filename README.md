# Life Weeks Tracker

A beautiful, interactive web application to visualize your life in weeks and record meaningful moments. Track your journey from birth to age 100 with the ability to add weekly highlights and reflections.

## 🎯 Features

- **Weekly Visualization**: See all 5,200 weeks of life displayed as interactive squares
- **Real-time Statistics**: Track total weeks, weeks passed, and weeks remaining
- **Highlight System**: Add notes, achievements, and reflections for each week
- **Data Persistence**: All data is stored locally in your browser (never sent to servers)
- **Data Export/Import**: Backup your data as JSON and restore it anytime
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Search & Filter**: Find specific weeks and view only remaining weeks
- **Week Status Indicators**:
  - **Gray**: Weeks that have passed
  - **Green**: Current week
  - **Orange**: Weeks with highlights added
  - **Purple**: Upcoming weeks

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
life-weeks-tracker/
├── public/
│   ├── index.html          # HTML entry point
│   ├── index.js            # Module loader
│   └── styles.css          # Styling
├── src/
│   ├── config.js           # Configuration and constants
│   ├── index.js            # App initialization
│   └── modules/
│       ├── app.js          # Main application logic
│       ├── weekManager.js  # Week generation and filtering
│       ├── storage.js      # LocalStorage management
│       └── ui.js           # UI rendering and events
├── package.json            # Dependencies and scripts
├── vite.config.js          # Build configuration
└── README.md              # This file
```

## 📊 How It Works

### Birth Information
- **Birth Date**: June 6, 1994
- **Target Age**: 100 years
- **Total Weeks**: 5,200

### Week Calculation
- Each week represents 7 consecutive days
- Week 1 starts from your birth date
- Statistics update in real-time

### Data Storage
All your highlights are stored in the browser's localStorage under the key `lifeWeeksHighlights`. This means:
- ✅ Your data never leaves your device
- ✅ No server required
- ✅ Persists across browser sessions
- ✅ Can be backed up and restored

## 💾 Data Management

### Export Your Data
Click the "↓ Export" button to download all your highlights as a JSON file. This creates a backup you can store safely.

### Import Your Data
Click the "↑ Import" button and select a previously exported JSON file to restore your data.

### Access Data Programmatically
Open browser console and use:
```javascript
// View all highlights
window.__appDebug.getAllHighlights()

// Export data
window.__appDebug.exportData()

// Import data
window.__appDebug.importData(jsonData)

// Clear all data (⚠️ irreversible)
window.__appDebug.clearAllData()
```

## 🎨 Customization

### Change Birth Date
Edit `src/config.js`:
```javascript
BIRTH_DATE: new Date(1994, 5, 6), // Month is 0-indexed
```

### Change Target Age
Edit `src/config.js`:
```javascript
TARGET_AGE: 100,
```

## 🔒 Privacy & Security

- **No Data Collection**: This app doesn't collect any personal information
- **No External Requests**: All processing happens locally
- **No Tracking**: No analytics or tracking code
- **Open Source**: Code is transparent and auditable

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Deploy to GitHub Pages

1. Update `package.json` with your repository:
```json
{
  "homepage": "https://yourusername.github.io/life-weeks-tracker"
}
```

2. Build and deploy:
```bash
npm run build
# Push the dist/ folder to gh-pages branch
```

### Deploy to Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

## 🛠 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (when configured)
- `npm run format` - Format code with Prettier (when configured)

### Adding Features

The app is modular and extensible:

1. **New Storage Operations**: Extend `src/modules/storage.js`
2. **New UI Elements**: Add to `src/modules/ui.js`
3. **New Logic**: Add to `src/modules/weekManager.js` or `src/modules/app.js`

## 📚 API Reference

### WeekManager

```javascript
WeekManager.generateAllWeeks()           // Generate all weeks
WeekManager.calculateStats(weeks)        // Calculate statistics
WeekManager.filterWeeks(weeks, ...)      // Filter weeks
```

### StorageManager

```javascript
StorageManager.getHighlights(weekNumber)  // Get highlights for a week
StorageManager.saveHighlights(number, text)  // Save highlights
StorageManager.getAllHighlights()         // Get all highlights
StorageManager.exportData()               // Export as Blob
StorageManager.importData(json)           // Import from JSON
StorageManager.clearAllData()             // Clear all data
```

## 🐛 Debugging

The app exposes debug utilities in the console:

```javascript
window.__appDebug.app                    // App instance
window.__appDebug.getAllHighlights()     // View stored data
window.__appDebug.exportData()           // Manual export
window.__appDebug.importData(data)       // Manual import
window.__appDebug.clearAllData()         // Clear all data
```

## 📄 License

MIT License - feel free to use, modify, and distribute this project.

## 🙏 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 💡 Tips for Usage

1. **Weekly Reflection**: Set a reminder every Sunday to review and add highlights
2. **Backup Regularly**: Export your data monthly to ensure it's safe
3. **Share Insights**: Export and share specific weeks with friends
4. **Track Milestones**: Use highlights to mark significant life events
5. **Review Progress**: Look back at past weeks for motivation and perspective

## 🎓 Learning Value

This project demonstrates:
- Modern ES6+ JavaScript modules
- LocalStorage API usage
- Responsive design principles
- Component-based architecture
- Build tool configuration (Vite)
- Date/Time handling in JavaScript
- Event-driven UI updates

---

**Made with ❤️ to help you appreciate every week of your life.**
