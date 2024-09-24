const express = require('express');
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");
const userModel = require("../models/userModel");

router.post("/level2",isLoggedin, async (req, res) => {
    try {
        let {ans} = req.body;
        let myans = "3";
        if(ans===myans){
            let user = await userModel.findOne({name: req.user.name});
            if (user) {
                user.currLevel = 2; // Update currLevel directly
                await user.save();  // Save the updated document
                req.flash('success', 'Congratulations! You have completed Level 1.');
                res.redirect("/level2");
            } else {
                req.flash("error", "User not found");
                res.redirect("/login");
            }
        }
        else{
            let error = req.flash("error", "Incorrect answer");
            res.redirect("/level1");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/level3",isLoggedin, async (req, res) => {
    try {
        let {ans} = req.body;
        let myans = "c69f4s68";
        if(ans===myans){
            let user = await userModel.findOne({name: req.user.name});
            if (user) {
                user.currLevel = 3; // Update currLevel directly
                await user.save();  // Save the updated document
                req.flash('success', 'Congratulations! You have completed Level 2.');
                res.redirect("/level3");
            } else {
                req.flash("error", "User not found");
                res.redirect("/login");
            }
        }
        else{
            let error = req.flash("error", "Incorrect answer");
            res.redirect("/level2");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/level4",isLoggedin, async (req, res) => {
    try {
        let {ans} = req.body;
        let myans = "787218";
        if(ans===myans){
            let user = await userModel.findOne({name: req.user.name});
            if (user) {
                user.currLevel = 4; // Update currLevel directly
                await user.save();  // Save the updated document
                req.flash('success', 'Congratulations! You have completed Level 3.');
                res.redirect("/level4");
            } else {
                req.flash("error", "User not found");
                res.redirect("/login");
            }
        }
        else{
            let error = req.flash("error", "Incorrect answer");
            res.redirect("/level3");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/level5",isLoggedin, async (req, res) => {
    try {
        let {ans} = req.body;
        let myans1 = " {3+(6-2)/2*2-(6/3*4)+1}";
        let myans2 = "{3+(6-2)/2*2-(6/3*4)+1}";
        if(ans===myans1 || ans===myans2){
            let user = await userModel.findOne({name: req.user.name});
            if (user) {
                user.currLevel = 5; // Update currLevel directly
                await user.save();  // Save the updated document
                req.flash('success', 'Congratulations! You have completed Level 4.');
                res.redirect("/level5");
            } else {
                req.flash("error", "User not found");
                res.redirect("/login");
            }
        }
        else{
            let error = req.flash("error", "Incorrect answer");
            res.redirect("/level4");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/level6",isLoggedin, async (req, res) => {
    try {
        let {ans} = req.body;
        let myans1 = "78er5t9";
        if(ans===myans1){
            let user = await userModel.findOne({name: req.user.name});
            if (user) {
                user.currLevel = 6; // Update currLevel directly
                await user.save();  // Save the updated document
                req.flash('success', 'Congratulations! You have completed Level 5.');
                res.redirect("/level6");
            } else {
                req.flash("error", "User not found");
                res.redirect("/login");
            }
        }
        else{
            let error = req.flash("error", "Incorrect answer");
            res.redirect("/level5");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/level7",isLoggedin, async (req, res) => {
    try {
        let {ans} = req.body;
        let myans1 = "1";
        if(ans===myans1){
            let user = await userModel.findOne({name: req.user.name});
            if (user) {
                user.currLevel = 7; // Update currLevel directly
                await user.save();  // Save the updated document
                req.flash('success', 'Congratulations! You have completed Level 6.');
                res.redirect("/level7");
            } else {
                req.flash("error", "User not found");
                res.redirect("/login");
            }
        }
        else{
            let error = req.flash("error", "Incorrect answer");
            res.redirect("/level6");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports =  router;