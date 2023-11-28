const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controller/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage});
//New Route

router.get("/new",isLoggedIn,listingController.renderNewForm);


// router.routes for the same path:

//combined index route and create route
router.
route("/").get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single('listing[image]'),validateListing,
wrapAsync(listingController.createListing)); 



//combined show route , update route and delete route
router.route("/:id").get(wrapAsync(listingController.showListing)).
put(isLoggedIn,isOwner,
upload.single("listing[image]"),
validateListing,
wrapAsync(listingController.updateListing)).
delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
// Index Route
 
// router.get("/",wrapAsync(listingController.index));  // router.routes is used instead 



// Show Route

// router.get("/:id",wrapAsync(listingController.showListing));

// Create Route

// router.post("/", isLoggedIn,validateListing,
// wrapAsync(listingController.createListing));  // router.routes is used instead 


// Edit Route;

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

// Update Route

// router.put("/:id", isLoggedIn,isOwner,validateListing,
// wrapAsync(listingController.updateListing));

// DELETE Route

// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports=router;


// router.post - // const {title,description,image,price,location,country}=req.body;
//    if(!req.body.listing){
//     throw new ExpressError(400,"Send Valid data for listing");
//    }
// const result=listingSchema.validate(req.body);
// if(result.error){
//     throw new ExpressError(400,result.error);
// }