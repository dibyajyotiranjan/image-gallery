const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dibyadynamic",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connection to compass")
});