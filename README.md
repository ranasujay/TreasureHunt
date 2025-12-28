# 🏆 Treasure Hunt Game

A modern multi-level puzzle game built with React + Vite frontend and Express.js backend, featuring 11 challenging levels with real-time leaderboard and mobile-responsive design.

## ✨ Features

### Core Features
- 🔐 **Admin-Only Registration**: Controlled team registration at `/admin/register`
- 🎯 **11 Progressive Levels**: Challenging puzzles with diverse question types
- 📊 **Real-time Leaderboard**: Auto-updates every 5 seconds with timestamp-based ranking
- 🏅 **Accurate Rankings**: Teams ranked by level and completion time (millisecond precision)
- 📱 **Mobile-First Design**: Fully responsive with mobile-optimized 3-dot menu
- 💾 **Persistent Sessions**: localStorage authentication - stays logged in on refresh
- 🎨 **Modern UI**: Glassmorphism design with Tailwind CSS
- 🔔 **Toast Notifications**: Professional notifications with react-hot-toast
- 🔒 **Protected Routes**: Level-based access control
- 🌐 **Single-Server Deployment**: Production-ready with one server

### User Experience
- ✅ Clear form inputs when advancing to next level
- ✅ Real-time competition tracking
- ✅ Mobile-friendly navigation with collapsible menu
- ✅ Admin can register multiple teams without navigation
- ✅ Smart back button (remembers where you came from)
- ✅ Live indicator showing leaderboard status

## 🛠️ Tech Stack

### Frontend
- React 18.3.1
- Vite 5.1.4 (Fast build tool)
- React Router DOM 6.22.0
- Axios 1.6.7
- Tailwind CSS 3.4.1
- react-hot-toast (Toast notifications)

### Backend
- Node.js with ES6 Modules
- Express.js 4.21.0
- MongoDB with Mongoose 8.6.3
- JWT Authentication (with localStorage)
- Bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd treasure-hunt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/treasure-hunt
   JWT_SECRET=your-secret-key-here
   PORT=3000
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system.

## 🚀 Running the Application

### Development Mode (2 Servers for Hot Reload)
```bash
npm run dev
```

This will start:
- 🔧 Backend API server on `http://localhost:3000`
- ⚛️ Frontend dev server on `http://localhost:5173` (with hot reload)
- ℹ️ Running on 2 separate ports in development

### Run Backend Only
```bash
npm run server
```

### Run Frontend Only
```bash
npm run client
```

## 🌐 Production Deployment

### Build & Run (1 Server - Production Ready)

1. **Build the React app**
   ```bash
   npm run build
   ```
   This creates optimized static files in the `dist/` folder.

2. **Start production server**
   
   **Windows:**
   ```bash
   npm run start:win
   ```
   
   **Linux/Mac:**
   ```bash
   npm start
   ```

3. **Access the app**
   
   Visit `http://localhost:3000` - Everything runs on ONE server!
   - 🌐 Application: http://localhost:3000
   - ✅ Serving frontend + backend on single port

### How It Works

**Development** (2 servers):
- Vite dev server (5173) - For React hot reload
- Express backend (3000) - API server
- Vite proxies `/api` calls to Express

**Production** (1 server):
- Express serves both React static files AND API
- React app built into `dist/` folder
- All routes go through port 3000
- Only one server to deploy!

### Environment Variables for Production

Add to your `.env`:
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
```

## 📁 Project Structure

```
treasure-hunt/
├── src/                      # React frontend
│   ├── components/           # Reusable components
│   │   └── ProtectedRoute.jsx
│   ├── pages/               # Page components
│   │   ├── Login.jsx        # Team login
│   │   ├── Register.jsx     # Admin-only registration
│   │   ├── Level.jsx        # Dynamic level component (all 11 levels)
│   │   └── Leaderboard.jsx  # Real-time rankings
│   ├── context/             # React Context
│   │   └── AuthContext.jsx  # Auth with localStorage
│   ├── utils/               # Utility functions
│   │   └── api.js           # Axios API wrapper
│   ├── App.jsx              # Main App with routing
│   ├── main.jsx             # Entry point with Toaster
│   └── index.css            # Global styles + animations
├── routes/                  # Express API routes
│   ├── adminRouter.js       # Registration & leaderboard
│   ├── usersRouter.js       # Login endpoint
│   ├── checkerRouter.js     # Answer validation with timestamps
│   └── levelRouter.js       # Level access control
├── models/                  # Mongoose models
│   └── userModel.js         # User schema with timestamps
├── middleware/              # Express middleware
│   └── isLoggedin           # JWT authentication
├── config/                  # Configuration
│   └── mongoDB_connect.js   # MongoDB connection
├── public/                  # Static assets
│   └── images/
│       ├── background.webp  # Background image
│       └── level1.jpeg      # Level 1 image
├── dist/                    # Production build (generated)
├── app.js                   # Express server (ES6 modules)
├── vite.config.js           # Vite configuration with proxy
├── tailwind.config.js       # Tailwind with custom animations
├── postcss.config.js        # PostCSS configuration
├── DEPLOYMENT.md            # Detailed deployment guide
└── package.json             # Dependencies and scripts
```

## 🎮 How to Play

### For Admin
1. **Register Teams**: Visit `http://localhost:3000/admin/register`
2. **Create Accounts**: Register teams one by one (form auto-clears)
3. **View Leaderboard**: Check all registered teams and their progress
4. **Provide Credentials**: Share team names and passwords with participants

### For Teams
1. **Login**: Go to `http://localhost:3000` and enter your credentials
2. **Solve Puzzles**: Answer questions correctly to advance through 11 levels
3. **Submit Answers**: Input is cleared automatically after each correct answer
4. **Check Rankings**: View real-time leaderboard (updates every 5 seconds)
5. **Complete Game**: Reach level 12 (congratulations page)

### Leaderboard Ranking System
- 🥇 **Primary Sort**: By level (highest level first)
- 🥈 **Secondary Sort**: By completion time (earliest submission wins)
- ⏱️ **Precision**: Millisecond-accurate timestamps
- 🔄 **Updates**: Automatic refresh every 5 seconds
- 📊 **Live Indicator**: Green pulsing dot shows real-time status

## 🔐 API Endpoints

### Authentication
- `POST /api/users/login` - Team login (returns user object with level)
- `POST /api/admin/register` - Admin registration (creates new team)

### Levels
- `GET /api/levels/current` - Get current user info
- `GET /api/levels/check/:level` - Check level access permission
- `POST /api/checker/check/:nextLevel` - Submit answer (saves timestamp)

### Leaderboard
- `GET /api/admin/leaderboard` - Get all teams sorted by level + time

## 🎨 Customization

### Adding New Levels

1. **Update level content** in `src/pages/Level.jsx`:
   ```javascript
   const levelContent = {
     13: {
       title: 'Level 13',
       question: 'Your question here',
       hint: 'Your hint here',
       // Optional: image, link, puzzle, etc.
     },
   };
   ```

2. **Add answer** in `routes/checkerRouter.js`:
   ```javascript
   const levelAnswers = {
     13: ["answer1", "answer2", "Answer1"], // Case-sensitive variations
   };
   ```

3. **Add route** in `src/App.jsx`:
   ```javascript
   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(level => (
   ```

4. **Update level count** in `src/pages/Level.jsx` (currently shows "Level X of 11")

### Changing UI Theme

Edit `tailwind.config.js` to customize:
- Colors
- Fonts
- Animations
- Breakpoints



## 🐛 Troubleshooting

### Port Already in Use
If port 3000 or 5173 is in use:
- Backend: Change `PORT` in `.env` or `app.js`
- Frontend: Change port in `vite.config.js`

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- For MongoDB Atlas: Whitelist your IP address
- Verify database name matches

### Login Not Working
- Check if JWT_SECRET is set in `.env`
- Clear localStorage: `localStorage.clear()` in browser console
- Verify user exists in database
- Check browser network tab for API errors

### Leaderboard Not Updating
- Ensure MongoDB is running
- Check if timestamps are being saved (check database)
- Verify API endpoint `/api/admin/leaderboard` returns data
- Check browser console for errors

### Build Issues
- Delete `dist/` folder and `node_modules/`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Try: `npm run build` again

### Mobile Menu Not Working
- Clear browser cache
- Check if JavaScript is enabled
- Verify build includes all files
- Test in different browser

## 📦 Recommended Deployment

### ✅ Best Options (No Code Changes Needed):

**1. Render.com** (Recommended - Free Tier)
- Supports Node.js + MongoDB
- Free PostgreSQL/MongoDB options
- Easy GitHub integration
- Automatic deploys

**2. Railway.app**
- Excellent for full-stack apps
- MongoDB support included
- Simple deployment
- $5/month starter plan

**3. Fly.io**
- Free tier available
- Global deployment
- Good for Node.js apps

### Deployment Steps (Render Example):

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=<your_mongodb_atlas_uri>
   JWT_SECRET=<random_secure_string>
   PORT=3000
   ```
5. Build command: `npm install && npm run build`
6. Start command: `npm start`
7. Deploy!

## 🔒 Security Best Practices

- ✅ JWT secrets stored in environment variables
- ✅ Passwords hashed with bcrypt
- ✅ Admin routes protected at `/admin/*`
- ✅ CORS configured properly
- ✅ MongoDB injection prevention with Mongoose
- ⚠️ Add rate limiting for production (recommended)
- ⚠️ Use HTTPS in production (required)

## 📱 Mobile Features

- **Responsive Navigation**: 3-dot menu on mobile (< 768px)
- **Touch-Friendly**: Larger tap targets on mobile devices
- **Optimized Images**: Smaller images on mobile (max-h-48 vs md:max-h-72)
- **Flexible Layout**: Stacks vertically on small screens
- **Mobile-First CSS**: Uses Tailwind's `md:` breakpoint system

## 🎯 Game Features

- **11 Active Levels**: Diverse puzzle types (math, logic, memory, etc.)
- **Level 12**: Congratulations/completion page
- **Auto-Clear Inputs**: Form resets when advancing to next level
- **Answer Validation**: Case-sensitive answer checking
- **Hint System**: Each level has helpful hints
- **Progress Tracking**: Visual progress bar shows completion percentage
- **Protected Navigation**: Cannot skip levels or access incomplete levels

## 📝 Scripts Reference

```json
{
  "dev": "concurrently \"npm run server\" \"npm run client\"",
  "server": "nodemon app.js",
  "client": "vite",
  "build": "vite build",
  "start": "NODE_ENV=production node app.js",
  "start:win": "set NODE_ENV=production&& node app.js"
}
```


**Happy Hunting! 🎯🏆**

*Built with ❤️ using React, Vite, Express, and MongoDB*
