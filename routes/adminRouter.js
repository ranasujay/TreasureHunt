const express = require('express');
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



router.post("/register",  async function(req,res){
    // res.send("hello");
    let {name, password} = req.body;

    let user =  await userModel.findOne({name: name});
    
    if(user){
        req.flash("error", "Aleady have an account, Please login")
        res.redirect("/admin/register"); 
    } 
    
    else{
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async function( err, hash){
                if(err) res.send(err.massage);
                else{
                    let user = await userModel.create({
                        name,
                        password: hash
                    })
                    
                    req.flash("success", "User created successfully")
                    res.redirect("/admin/register"); 

                }
            })
        })
    }
});
router.get("/leaderboard", async (req, res) => {
    try {
        // Fetch users sorted by currLevel in descending order
        const users = await userModel.find().sort({ currLevel: -1 });
        // Render the leaderboard page with the user data
        res.render("leaderboard", { users });
    } catch (error) {
        console.error(error);
        req.flash("error", "Failed to load leaderboard.");
        res.redirect("/");
    }
});


module.exports =  router;

