const express= require("express")
const app= express();
const path = require("path");
const port= process.env.port || 3000;
const hbs= require("hbs");

var session = require('express-session')
app.use(session({
    secret: 'iwatefivbcxjhfv7kyg',
    resave: false,
    saveUninitialized: false
  }))
//conn
require("./models/user");
require("./models/crpost")
require("./models/com");
//app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(require("./routes/user"));
app.use(require("./routes/post"));
require("./db/conn");
// static path
const staticpath = path.join(__dirname,"./public");
const temlatepath = path.join(__dirname,"./templates/views");
const partialpath = path.join(__dirname,"./templates/partials");
app.use(express.static(staticpath));
app.set("view engine","hbs");
app.set("views",temlatepath);
hbs.registerPartials(partialpath);
app.get("/all",(req,res)=>{
    res.render("all")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/post",(req,res)=>{
    res.render("post")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.get("/view",(req,res)=>{
    res.render("view")
})
app.listen(port,()=>{
    console.log(` server is running at port  no ${port}`)
})