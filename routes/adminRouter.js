import express from 'express';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/register", async function(req, res) {
    let { name, password } = req.body;

    try {
        let user = await userModel.findOne({ name: name });

        if (user) {
            return res.status(400).json({ 
                success: false, 
                message: "Already have an account, Please login" 
            });
        }

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if (err) {
                    return res.status(500).json({ 
                        success: false, 
                        message: err.message 
                    });
                }
                
                let user = await userModel.create({
                    name,
                    password: hash
                });

                return res.json({ 
                    success: true, 
                    message: "User created successfully" 
                });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            success: false, 
            message: "An error occurred" 
        });
    }
});

router.get("/leaderboard", async (req, res) => {
    try {
        // Sort by level (descending), then by completion time (ascending - earliest first)
        const users = await userModel.find().sort({ 
            currLevel: -1, 
            lastLevelCompletedAt: 1 
        });
        res.json({ success: true, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to load leaderboard" 
        });
    }
});

export default router;

