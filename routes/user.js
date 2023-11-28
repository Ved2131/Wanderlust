const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controller/users.js");




// visit page
// router.get("/signup",userController.renderSignupForm);

//submit page
// router.post("/signup",userController.submitSignupForm);

router.route("/signup").get(userController.renderSignupForm).
post(userController.submitSignupForm);


// router.get("/login",userController.renderLoginForm);

// router.post("/login",
// saveRedirectUrl,
// passport.authenticate("local",{failureRedirect:'/login',
// failureFlash:true}),userController.login);

router.route("/login").get(userController.renderLoginForm).
post(saveRedirectUrl,
passport.authenticate("local",{failureRedirect:'/login',
failureFlash:true}),userController.login); 


router.get("/logout",userController.logout);

module.exports=router;