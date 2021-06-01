const mongoose = require("mongoose");
const Crp= mongoose.Schema({
    pic:{
        type:String,
        required:false
    },
    postedBy:{
       type:String,
       required:false
    },
    profilePic:{
        type:String,
        required:false
    },
    text:{
        type:String,
        required:false
    }
});
mongoose.model("post",Crp)