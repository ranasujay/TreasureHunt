const express = require('express');
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");
const userModel = require("../models/userModel");

router.get("/", async (req, res) => {
    try {
        let error = req.flash("error");
        let success = req.flash("success");
        res.render("index",{error,success});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/admin/register", async (req, res) => {
    try {
        let error = req.flash("error");
        let success = req.flash("success");
        res.render("register",{error,success});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/level1",isLoggedin, async (req, res) => {
    try {
        let error = req.flash("error");
        let success = req.flash("success");
        res.render("level1", {error, success});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/level2",isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({name: req.user.name});
        let error = req.flash("error");
        let success = req.flash("success");
        if(user.currLevel==2){
            res.render("level2", {error,success});
        }
        else{
            res.send("Access Denied");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/level3",isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({name: req.user.name});
        let error = req.flash("error");
        let success = req.flash("success");
        if(user.currLevel==3){
            res.render("level3", {error,success});
        }
        else{
            res.send("Access Denied");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/level4",isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({name: req.user.name});
        let error = req.flash("error");
        let success = req.flash("success");
        if(user.currLevel==4){
            res.render("level4", {error,success});
        }
        else{
            res.send("Access Denied");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/level5",isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({name: req.user.name});
        let error = req.flash("error");
        let success = req.flash("success");
        if(user.currLevel==5){
            res.render("level5", {error,success});
        }
        else{
            res.send("Access Denied");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.get("/level6",isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({name: req.user.name});
        let error = req.flash("error");
        let success = req.flash("success");
        if(user.currLevel==6){
            res.render("level6", {error,success});
        }
        else{
            res.send("Access Denied");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/level7",isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({name: req.user.name});
        let error = req.flash("error");
        let success = req.flash("success");
        if(user.currLevel==7){
            res.render("level7", {error,success});
        }
        else{
            res.send("Access Denied");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



module.exports =  router;