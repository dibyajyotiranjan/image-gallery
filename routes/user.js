const express= require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const router = express.Router();
const multer=require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/image/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = file.originalname
      cb(null, uniqueSuffix)
    }
  })
  
  var upload = multer({ storage: storage })

router.post("/signup",upload.single("sign"),(req,res)=>{
    const {name, email, password,photo} = req.body
    const Signup= new User({
        name:name,
        email:email,
        password:password,
        photo:req.file.filename
    })
    Signup.save()
    res.redirect("/");
    
    // .catch((err)=>{
    //     console.log(err)
    // })
});

// router.post("/login",async(req,res)=>{
//     let {email} = req.body
//    const log =await User.findOne({email:email})
// //    .then((log)=>{
// //        console.log(log);
// //         res.render("login",{sii:log})
// //    })
//    console.log(log);
//    res.render("login",{sii:log})
        
// })
router.post("/login",async(req,res)=>{
    let {email} = req.body
   var result=await User.findOne({email:email});
   console.log(result);
       if(result){
           sess= req.session;
           sess.nme=result.name;
           sess.email=result.email;
           sess.photo=result.photo;
           sess._id=result._id;
           res.redirect("/")
       }
       else{
           res.redirect("/")
       }
    
//    console.log(log);
//    res.render("login",{sii:log})
        
})
// router.post("/signin",(req,res)=>{
//     const {email,passward}=req.body
//     user.findOne({email:email})
//    .then(si=>{
//        if(si){
//            bcrypt.compare(passward,si.passward)
//            .then(sss=>{
//                if(sss){
//                    const token=jwt.sign({_id:si._id},jwt_secreate)
//                    return res.json({token,sss:"signin successus"})
//                }
//                res.json({sss:"lmsbk"})
//            })
//        }
    
//    })
//    .catch(err=>console.log(err))
// })

router.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.redirect("/")
        }
        
    });
})


module.exports=router