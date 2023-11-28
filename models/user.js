const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose"); 
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    }
})

// by default passportlocalmongooose have user and password schema

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User',userSchema);
