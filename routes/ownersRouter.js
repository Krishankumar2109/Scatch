const express =  require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');




if(process.env.NODE_ENV === "development"){
    router.post("/create",async function(req,res){

       let owners = await ownerModel.find();

       if(owners.length>0){
           return res.status(503).send("Owner already exists,You cant create more");
       }

       console.log("owner/create running")
       let {fullname,email,password} = req.body;

       let createdOwner = await ownerModel.create({fullname,email,password});

       res.status(201).send(createdOwner);
    });
}

router.get("/admin",function(req,res){
   let success = req.flash("success","Product Created Successfully");
    res.render("createProducts",{success});
});

module.exports = router;

