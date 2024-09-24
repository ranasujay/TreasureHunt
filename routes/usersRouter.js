const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await userModel.findOne({ name });

        if (!user) {
            req.flash("error", "Name or password incorrect");
            return res.redirect("/"); 
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ name, id: user._id }, process.env.JWT_SECRET || "secret");
            res.cookie("token", token);

            const currLevel = user.currLevel; // Use the found user directly
            req.flash("success", "Logged in successfully.");
            return res.redirect(`/level${currLevel}`);
        } else {
            req.flash("error", "Name or password incorrect");
            return res.redirect("/"); 
        }
    } catch (error) {
        console.error(error);
        req.flash("error", "An unexpected error occurred.");
        return res.redirect("/");
    }
});

module.exports = router;