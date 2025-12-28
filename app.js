import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./config/mongoDB_connect.js";
import adminRouter from "./routes/adminRouter.js";
import usersRouter from "./routes/usersRouter.js";
import checkerRouter from "./routes/checkerRouter.js";
import levelRouter from "./routes/levelRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.FRONTEND_URL || '*' 
        : 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API Routes
app.use("/api/users", usersRouter);
app.use("/api/admin", adminRouter);
app.use("/api/checker", checkerRouter);
app.use("/api/levels", levelRouter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Serve React App in Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📦 Mode: ${process.env.NODE_ENV || 'development'}`);
    
    if (process.env.NODE_ENV === 'production') {
        console.log(`🌐 Application: http://localhost:${PORT}`);
        console.log(`✅ Serving frontend + backend on single port\n`);
    } else {
        console.log(`🔧 Backend API: http://localhost:${PORT}`);
        console.log(`⚛️  Frontend (Vite): http://localhost:5173`);
        console.log(`ℹ️  Running on 2 separate ports in development\n`);
    }
});
