const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initData=require("./data.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then((res)=>{
    console.log("Successfully connected");
}).catch((err)=>{
    console.log(err);
})


const initDB=async()=>{
    await Listing.deleteMany({});
   initData.data= initData.data.map((obj)=>({...obj, owner:"65623a29a5c4a8e8cac9c974"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();