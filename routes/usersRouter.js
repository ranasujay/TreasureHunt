import express from 'express';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await userModel.findOne({ name });

        if (!user) {
            return res.status(401).json({ success: false, message: "Name or password incorrect" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ name, id: user._id }, process.env.JWT_SECRET || "secret");
            res.cookie("token", token, { httpOnly: true });

            return res.json({ 
                success: true, 
                message: "Logged in successfully",
                user: {
                    name: user.name,
                    currLevel: user.currLevel,
                    level: user.currLevel
                }
            });
        } else {
            return res.status(401).json({ success: false, message: "Name or password incorrect" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An unexpected error occurred" });
    }
});

export default router;