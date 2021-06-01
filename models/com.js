const mongoose = require("mongoose");
const Com= mongoose.Schema({
    po:{
       type:String,
       required:true
    },
    pr:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
});
mongoose.model("com",Com)