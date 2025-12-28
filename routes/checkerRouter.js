import express from 'express';
import isLoggedin from '../middleware/isLoggedin';
import userModel from '../models/userModel.js';

const router = express.Router();

// Level answers configuration
const levelAnswers = {
    2: ["3"],
    3: ["c69f4s68"],
    4: ["787218"],
    5: [" {3 + (6 - 2) / 2 * 2 - (6 / 3 * 4) + 1}", "{3 + (6 - 2) / 2 * 2 - (6 / 3 * 4) + 1}"],
    6: ["78er5t9"],
    7: ["700106"],
    8: ["11", "12"],
    9: ["money heist", "Money heist", "money heist ", "Money heist "],
    10: ["e75hy6r"],
    11: ["last name", "Last name", "surname", "Surname", "Surname ", "Last name ", "last name ", "Title ", "Title", "title", "title "],
    12: ["TIPT", "IPTF", "TITF", "TIPF", "TIPTF"]
};

// Generic answer checker
router.post("/check/:nextLevel", isLoggedin, async (req, res) => {
    try {
        const { ans } = req.body;
        const nextLevel = parseInt(req.params.nextLevel);
        const currentLevel = nextLevel - 1;

        if (!levelAnswers[nextLevel]) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid level" 
            });
        }

        const correctAnswers = levelAnswers[nextLevel];
        const isCorrect = correctAnswers.includes(ans);

        if (isCorrect) {
            const user = await userModel.findOne({ name: req.user.name });
            
            if (user) {
                user.currLevel = nextLevel;
                // Store precise timestamp with millisecond accuracy
                user.lastLevelCompletedAt = new Date();
                await user.save();
                
                return res.json({ 
                    success: true, 
                    message: `Congratulations! You have completed Level ${currentLevel}.`,
                    nextLevel: nextLevel
                });
            } else {
                return res.status(404).json({ 
                    success: false, 
                    message: "User not found" 
                });
            }
        } else {
            return res.json({ 
                success: false, 
                message: "Incorrect answer. Try again!" 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
});

export default router;
