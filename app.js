if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
    // console.log(process.env.SECRET);
}

const express= require("express");
const app=express();
const mongoose=require("mongoose");

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

const dbUrl=process.env.ATLASDB_URL;


const methodOverride=require("method-override");
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");

const MongoStore=require("connect-mongo");

const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");
const path=require("path");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");


app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
const { nextTick } = require("process");
const { userInfo } = require("os");
app.engine("ejs",ejsMate);
app.set("view engine","ejs");




async function main(){
    await mongoose.connect(dbUrl);
}

main().then((res)=>{
    console.log("Successfully connected");
}).catch((err) =>{
    console.log(err);
})


const store=MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
     secret:"mysupersecretcode",
    },
    touchAfter:24*3600,
 
 })
store.on("error",()=>{
    console.log("Error on Mongo Session store",err); 
})

const sessionOptions={
    store,
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true,
    }
};




app.use(session(sessionOptions));
app.use(flash());

//Passport 
app.use(passport.initialize());
app.use(passport.session()); 
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    // console.log(res.locals.success);
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

// app.get("/demo",async(req,res)=>{
//     let fakeuser=new User({
//         email:"ved@gmail.com",
//         username:"Aedprakash"
//     }) 
//     let reguser=await User.register( fakeuser,"helloWorld");
//     res.send(reguser);
// })
// app.use((err,req,res,next)=>{
    //     res.send("something went wrong..!");
    // })
    
// routers folder se  aayega listing    
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.all("*",(req,res,next)=>{ 
    next(new ExpressError(404,"Page Not Found!"));
})
app.use((err,req,res,next)=>{ 
    let{statusCode=500,message="Something went wrong"}=err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("listings/error.ejs",{message});
})




app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});







































// app.get("/testlisting",async (req,res)=>{
//     let sampleList=new Listing({
//         title:"My new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"India",
//     })
//     await sampleList.save();

//     res.send("Succesful testing");
// })





//Index Route
 
// app.get("/listings",wrapAsync(async(req,res)=>{
//   const list= await Listing.find({});
//   res.render("listings/index.ejs",{list});
// }));


// //New Route

// app.get("/listings/new",(req,res)=>{
//     res.render("listings/new.ejs");
// })

// //validatelisting
// const validateListing=(req,res,next)=>{
// let{error}=listingSchema.validate(req.body);
// if(error){
//     let errmsg=error.details.map((el)=>el.message).join(",");
//     throw new ExpressError(400,errmsg);
// }else{
//     next();
// }
// }

// const validateReview=(req,res,next)=>{
//     let{error}=reviewSchema.validate(req.body);
//     if(error){
//         let errmsg=error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errmsg);
//     }else{
//         next();
//     }
//     }

// // Show Route

// app.get("/listings/:id",wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     const l=await Listing.findById(id).populate("reviews");
//     res.render("listings/show.ejs",{l});
// }));

// Create Route

// app.post("/listings",async (req,res,next)=>{
//     // const {title,description,image,price,location,country}=req.body;
//     try{
//     const newlisting=new Listing(req.body.listing);
//     await newlisting.save();
//     res.redirect("/listings");
//     }catch(err){
//         next(err);
//     }
// });

// app.post("/listings", validateListing,
// wrapAsync(async(req,res,next)=>{
//     const newlisting=new Listing(req.body.listing);
//     await newlisting.save();
//     res.redirect("/listings");
//     })
// );

// // Edit Route;

// app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
//     let{id}=req.params;
//     const listing=await Listing.findById(id);
//     res.render("listings/edit.ejs",{listing});
// }));

// // Update Route

// app.put("/listings/:id",validateListing,
// wrapAsync(async(req,res)=>{
//     if(!req.body.listing){
//         throw new ExpressError(400,"Send Valid data for listing");
//        }
//     let {id}=req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect("/listings");
// }));

// // DELETE Route

// app.delete("/listings/:id",wrapAsync(async(req,res)=>{
//     let{id}=req.params;
//     let dellis=await Listing.findByIdAndDelete(id);
//     console.log(dellis); 
//     res.redirect("/listings");
// }));

// //Post review route
// app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
//     let listing=await Listing.findById(req.params.id);
//     let newReview=new Review(req.body.review);

//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();

//     console.log("new review saved");
//     res.redirect(`/listings/${listing._id}`);
// }))

// //Delete review route

// app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
//     let {id,reviewId}=req.params;
//     await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
//     await Review.findByIdAndDelete(reviewId);

//     res.redirect(`/listings/${id}`);

// }))
// app.use((err,req,res,next)=>{
//     res.send("something went wrong..!");
// })



































// app.get("/testlisting",async (req,res)=>{
//     let sampleList=new Listing({
//         title:"My new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"India",
//     })
//     await sampleList.save();

//     res.send("Succesful testing");
// })

