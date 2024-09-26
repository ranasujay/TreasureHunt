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
        let myans1 = " {3 + (6 - 2) / 2 * 2 - (6 / 3 * 4) + 1}";
        let myans2 = "{3 + (6 - 2) / 2 * 2 - (6 / 3 * 4) + 1}";
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
        let myans1 = "700106";
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
router.post("/level8",isLoggedin, async (req, res) => {
    try {
        let {ans} = req.body;
        let myans1 = "11";
        let myans2 = "12";
        if(ans===myans1 || ans===myans2){
            let user = await userModel.findOne({name: req.user.name});
            if (user) {
                user.currLevel = 8; // Update currLevel directly
                await user.save();  // Save the updated document
                req.flash('success', 'Congratulations! You have completed Level 7.');
                res.redirect("/level8");
            } else {
                req.flash("error", "User not found");
                res.redirect("/login");
            }
        }
        else{
            let error = req.flash("error", "Incorrect answer");
            res.redirect("/level7");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/level9",isLoggedin, async (req, res) => {
    try {
        let {ans} = req.body;
        let myans1 = "money heist";
        let myans2 = "Money heist";
        let myans3 = "money heist ";
        let myans4 = "Money heist ";
        if(ans===myans1 || ans===myans2 || ans==myans3 || ans==myans4){
            let user = await userModel.findOne({name: req.user.name});
            if (user) {
                user.currLevel = 9; // Update currLevel directly
                await user.save();  // Save the updated document
                req.flash('success', 'Congratulations! You have completed Level 8.');
                res.redirect("/level9");
            } else {
                req.flash("error", "User not found");
                res.redirect("/login");
            }
        }
        else{
            let error = req.flash("error", "Incorrect answer");
            res.redirect("/level8");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/level10",isLoggedin, async (req, res) => {
    try {
        let {ans} = req.body;
        let myans1 = "e75hy6r";
        if(ans===myans1){
            let user = await userModel.findOne({name: req.user.name});
            if (user) {
                user.currLevel = 10; // Update currLevel directly
                await user.save();  // Save the updated document
                req.flash('success', 'Congratulations! You have completed Level 9.');
                res.redirect("/level10");
            } else {
                req.flash("error", "User not found");
                res.redirect("/login");
            }
        }
        else{
            let error = req.flash("error", "Incorrect answer");
            res.redirect("/level9");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/level11",isLoggedin, async (req, res) => {
    try {
        let {ans} = req.body;
        let myans1 = "last name";
        let myans2 = "Last name";
        let myans3 = "surname";
        let myans4 = "Surname";
        let myans5 = "Surname ";
        let myans6 = "Surname ";
        let myans7 = "Last name ";
        let myans8 = "last name ";
        let myans9 = "Title ";
        let myans10 = "Title";
        let myans11 = "title";
        let myans12 = "title ";
        if(ans===myans1 || ans==myans2 || ans==myans3 || ans==myans4 ||
            ans===myans5 || ans==myans6 || ans==myans7 || ans==myans8 ||
            ans===myans9 || ans==myans10 || ans==myans11 || ans==myans12
        ){
            let user = await userModel.findOne({name: req.user.name});
            if (user) {
                user.currLevel = 11; // Update currLevel directly
                await user.save();  // Save the updated document
                req.flash('success', 'Congratulations! You have completed Level 10.');
                res.redirect("/level11");
            } else {
                req.flash("error", "User not found");
                res.redirect("/login");
            }
        }
        else{
            let error = req.flash("error", "Incorrect answer");
            res.redirect("/level10");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.post("/level12",isLoggedin, async (req, res) => {
    try {
        let {ans} = req.body;
        let myans1 = "TIPT";
        let myans2 = "IPTF";
        let myans3 = "TITF";
        let myans4 = "TIPF";
        let myans5 = "TIPT";
        let myans6 = "TIPTF";
        
        if(ans===myans1 || ans==myans2 || ans==myans3 || ans==myans4  || ans==myans5  || ans==myans6){
            let user = await userModel.findOne({name: req.user.name});
            if (user) {
                user.currLevel = 12; // Update currLevel directly
                await user.save();  // Save the updated document
                req.flash('success', 'Congratulations! You have completed Level 11.');
                res.redirect("/level12");
            } else {
                req.flash("error", "User not found");
                res.redirect("/login");
            }
        }
        else{
            let error = req.flash("error", "Incorrect answer");
            res.redirect("/level11");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports =  router;