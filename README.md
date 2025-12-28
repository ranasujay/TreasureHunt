# 🏆 Treasure Hunt Game

A multi-level puzzle game built with React + Vite frontend and Express.js backend, featuring 12 challenging levels for teams to compete and solve.

## 🚀 Features

- **User Authentication**: Secure team registration and login with JWT
- **12 Progressive Levels**: Solve puzzles to advance through levels
- **Real-time Leaderboard**: See how your team ranks against others
- **Modern UI**: Beautiful glassmorphism design with Tailwind CSS
- **Responsive Design**: Works on desktop and mobile devices
- **Protected Routes**: Access control based on current level

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
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
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system.

## 🚀 Running the Application

### Development Mode (2 Servers for Hot Reload)
```bash
npm run dev
```

This will start:
- Backend API server on `http://localhost:3000`
- Frontend dev server on `http://localhost:5173` (with hot reload)

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
FRONTEND_URL=https://yourdomain.com
```

## 📁 Project Structure

```
treasure-hunt/
├── src/                      # React frontend
│   ├── components/           # Reusable components
│   │   ├── ProtectedRoute.jsx
│   │   └── Toast.jsx
│   ├── pages/               # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Level.jsx
│   │   └── Leaderboard.jsx
│   ├── context/             # React Context
│   │   └── AuthContext.jsx
│   ├── utils/               # Utility functions
│   │   └── api.js
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── routes/                  # Express routes
│   ├── adminRouter.js
│   ├── usersRouter.js
│   ├── checkerRouter.js
│   └── levelRouter.js
├── models/                  # Mongoose models
│   └── userModel.js
├── middleware/              # Express middleware
│   └── isLoggedin
├── config/                  # Configuration
│   └── mongoDB_connect.js
├── public/                  # Static assets
│   └── images/
├── app.js                   # Express server
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json

```

## 🎮 How to Play

1. **Register**: Create a team account with a unique name
2. **Login**: Login with your team credentials
3. **Solve Puzzles**: Answer questions correctly to advance
4. **Progress**: Complete all 12 levels
5. **Compete**: Check the leaderboard to see your ranking

## 🔐 API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/admin/register` - User registration

### Levels
- `GET /api/levels/current` - Get current user info
- `GET /api/levels/check/:level` - Check level access
- `POST /api/checker/check/:nextLevel` - Submit answer

### Leaderboard
- `GET /api/admin/leaderboard` - Get all teams sorted by level

## 🎨 Customization

### Adding New Levels

1. **Update level content** in `src/pages/Level.jsx`:
   ```javascript
   const levelContent = {
     13: {
       title: 'Level 13',
       question: 'Your question here',
       hint: 'Your hint here',
     },
   };
   ```

2. **Add answer** in `routes/checkerRouter.js`:
   ```javascript
   const levelAnswers = {
     13: ["answer1", "answer2"],
   };
   ```

3. **Add route** in `src/App.jsx`

### Changing UI Theme

Edit `tailwind.config.js` to customize colors, animations, and more.

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 or 5173 is in use, change them in:
- Backend: `app.js` (PORT variable)
- Frontend: `vite.config.js`

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- For MongoDB Atlas, whitelist your IP address

### CORS Issues
- Development: Verify `http://localhost:5173` is in CORS origin
- Production: Set `FRONTEND_URL` in `.env` or use `*` (not recommended)

### Build Issues
- Delete `dist/` folder and rebuild
- Clear npm cache: `npm cache clean --force`

## 📦 Deployment Guides

### Deploy to Render/Railway/Fly.io

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=<your_mongodb_uri>`
   - `JWT_SECRET=<your_secret>`
4. Build command: `npm install && npm run build`
5. Start command: `npm start` (or `npm run start:win` for Windows)

### Deploy to Vercel/Netlify (API + Static)

Since these are primarily for static sites, you'll need:
1. Deploy backend separately (Render/Railway)
2. Update API base URL in `src/utils/api.js`
3. Deploy frontend to Vercel/Netlify

### Deploy to VPS (DigitalOcean/AWS/etc)

1. Install Node.js and MongoDB on server
2. Clone repository
3. Install dependencies: `npm install`
4. Build: `npm run build`
5. Use PM2 to run: `pm2 start app.js`
6. Set up Nginx as reverse proxy

## 📝 License

ISC

## 👥 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 🙏 Acknowledgments

- Tailwind CSS for the beautiful styling
- React team for the amazing framework
- MongoDB for the database

---

**Happy Hunting! 🎯**
