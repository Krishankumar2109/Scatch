

const express =  require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");



router.post("/create",upload.single("image"),async function(req,res){

    let {name,price,discount,bgColor,panelColor,textColor} = req.body;
    let product =await  productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgColor,
        panelColor,
        textColor
    });
    req.flash("success","Product Created Successfully");
    console.log("Product Created Successfully",product);
    res.redirect("/owners/admin");
   
});
// catch(err){
//     console.log(err.message);
//     res.send(err.message);
// };
router.get("/products",function(req,res){
    res.send("Products Route");
});


module.exports = router;