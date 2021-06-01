// const express= require("express")
// const router = express.Router();
// const mongoose =require("mongoose")
// const Ppost = mongoose.model("post")
// const Path = require("path")
// const multer = require("multer")

// // const upload = multer({
// //     dest:`./upload/image`
// // })
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Path.extname(file.originalname)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
//   var upload = multer({ storage: storage })

//   router.post("/post",upload.single("profile"),(req,res)=>{
//    // const {ttt}=req.body;
//     console.log(req.file);
//       const Post= new Ppost({
//           title:req.file.filename
//       })
//       Post.save()
//       .then(ppp=>{
//           if(ppp){
//             return res.json({ppp:"post succusses"});
//           }
//           res.json("not succusses")
         
//       }).catch((err)=>console.log(err))
//   })
// module.exports=router
const express = require("express")
const router = express.Router();
const mongoose= require("mongoose")
const Ppost = mongoose.model("post");
const Com = mongoose.model("com");
const multer= require("multer")
const path = require("path")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = file.originalname
      cb(null, uniqueSuffix)
    }
  })
  
  var upload = multer({ storage: storage })
  router.post("/post",upload.single("profile"),(req,res)=>{
    const {ttt} = req.body;
      if(req.session.email){
        const Crp = new Ppost({
          pic:req.file.filename,
          postedBy:req.session.nme,
          profilePic:req.session.photo,
          text:ttt
      })
      Crp.save()
      .then((e)=>{
          if(e){
              res.json(e)
          }
          else console.log("err")
      })
      .catch((err)=>{
          console.log(err)
      })
      }
      else{
        res.redirect("/login")
      }
    
     
  })
  router.get("/",async(req,res)=>{
      //const {pic}=req.body
      console.log(req.session);
      console.log(req.session.path)
      const Image= await Ppost.find();
      //const lo=res.render("logout")
      res.render("index",{si:Image,dd:req.session.nme,Pp:req.session.photo});
      // if(req.session.email){
      //   const Image= await Ppost.find()
      // res.render("index",{si:Image,dd:req.session.nme,Pp:req.session.photo});
      // }
      // else{
      //   res.redirect("/login")
      // }
      
  })


router.put("/com",(req,res)=>{
  console.log(eq.params.id)
    const {ttt} = req.params.id;
    let query = "dibya";
    Ppost.findOneAndUpdate(query,{text:ttt},{upsert:true,new:true},(err,data)=>{
      if(err){
        console.log(err,"this is not working page");
      }
      else{
        res.json(data);
      }
    })
    .then((result)=>{
      res.json(result)
    })
    .catch((err)=>{console.log(err)})
  })


  // router.put("/com",(req,res)=>{
  //   console.log(req.body);
  // })

     
  // const {ttt}=req.body;
  // const com = new Ppost({
  //   text:ttt
  // })
  // com.save()
  // .then((e)=>{
  //   res.json(e);
  // })
  // .catch((err)=>{
  //   console.log(err);
  // })


// router.get("/all",async(req,res)=>{
//   //const {pic}=req.body
//   const Image= await Ppost.find()
//   res.render("all",{si:Image});
 //.then(si=>{
   //res.json(si)
   
      //const {_id,pic,__v}=si
    //   var i;
    //   for(i=0; i<si.length; i++){
    //  //console.log(si[i].pic)
      
    //  }
 // res.render("all",{si:si});
 //})
 //.catch(err=>console.log(err))
//})

module.exports=router