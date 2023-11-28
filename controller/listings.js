
const Listing=require("../models/listing");
// MAP GEOCODING
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); 
const mapToken=process.env.MAP_TOKEN;
const geocodingClient=mbxGeocoding({accessToken:mapToken});




module.exports.index=async(req,res)=>{
  const list= await Listing.find({});
  res.render("listings/index.ejs",{list});
};

module.exports.renderNewForm=(req,res)=>{
    // console.log(req.user );
    
    res.render("listings/new.ejs");
};


module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const l=await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");

    if(!l){
        req.flash("error","Listing does not exist..!");
        res.redirect("/listings");
    } 
    console.log(l);
    res.render("listings/show.ejs",{l});
}

module.exports.createListing=async(req,res,next)=>{
   let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send() 



    let url=req.file.path;
    let filename=req.file.filename;
    
    // console.log(url,"..",filename);
    const newlisting=new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={url,filename};

    newlisting.geometry=response.body.features[0].geometry;


    let savedListing=await newlisting.save();
    console.log(savedListing);
    req.flash("success","New Listing Successfully Added..!")
    res.redirect("/listings");
};

module.exports.renderEditForm=async(req,res)=>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exist..!");
        res.redirect("/listings");
    } 

    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/c_fill,h_300,w_250/e_blur:300");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing=async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send Valid data for listing");
       }

    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});

    // image uploaded to save in database while updation , if you have uploaded only then

    if(typeof req.file!=="undefined"){
    let url=req.file.path; 
    let filename=req.file.filename;

    listing.image={url,filename};
    await listing.save();
    }

    req.flash("success","Listing Updated..!")
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async(req,res)=>{
    let{id}=req.params;
    let dellis=await Listing.findByIdAndDelete(id);
    console.log(dellis); 
    req.flash("success","Listing Deleted..!")
    res.redirect("/listings");
};
