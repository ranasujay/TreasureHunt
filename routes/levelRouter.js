import express from 'express';
import isLoggedin from '../middleware/isLoggedin';
import userModel from '../models/userModel.js';

const router = express.Router();

// Get current user level info
router.get("/current", isLoggedin, async (req, res) => {
    try {
        const user = await userModel.findOne({ name: req.user.name });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ 
            success: true, 
            name: user.name,
            currLevel: user.currLevel 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Check if user can access a specific level
router.get("/check/:level", isLoggedin, async (req, res) => {
    try {
        const level = parseInt(req.params.level);
        const user = await userModel.findOne({ name: req.user.name });
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.currLevel >= level) {
            res.json({ success: true, canAccess: true });
        } else {
            res.json({ success: false, canAccess: false, message: "Access Denied" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;
