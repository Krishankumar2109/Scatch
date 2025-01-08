const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken}  = require("../utils/generateToken");
const productModel = require("../models/product-model");

module.exports.registeredUser = function(req,res){
    try{
    let {fullname,email,password} = req.body;

    let user = userModel.findOne({email:email});
    if(!user){
        return res.status(400).send("User already exists");
      
    }
    else{

        bcrypt.genSalt(10,function(err,salt){
            if(err){
                return res.status(500).send("Something went wrong");
            }
            bcrypt.hash(password,salt,async function(err,hash){
                if(err){
                    return res.status(500).send("Something went wrong");
                }
                
                let user = await userModel.create({fullname,email,password:hash});
        console.log("user created");
        res.status(201).send(user);
    
       let token= generateToken(user);
       res.cookie("token",token);
        res.send("user created successfully");
    
            });
        });

    }

   

}
catch(err){
    console.log(err.message);
}

}

module.exports.loginUser = async function(req,res){
    
    let {email,password} = req.body;

    let user = await userModel.findOne({email:email });
    if(!user){
        return res.status(400).send("Invalid Credentials");
    }

     bcrypt.compare(password,user.password,async function(err,result){
        console.log("loginned");
       
       // res.send(result);
        if(!result){
            return res.status(400).send("Invalid Credentials");
        }
        let token = generateToken(user);
        res.cookie("token",token);
        //res.send("Logged in successfully");
        let products = await productModel.find();
        console.log(products);
        res.render("shop",{products});
    });
}



module.exports.logoutUser = function(req,res){
    res.clearCookie("token");
    //res.send("Logged out successfully");
    res.redirect("/");
}