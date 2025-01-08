const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');


module.exports.isLoggedIn = async function(req,res,next){

   
    try{
        let token = req.cookies.jwt;
        if(token){
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            let user = await userModel.findOne({email:decoded.email}).select("-password");
            if(user){
                req.user = user;
                next();
            }
            else{
                res.status(401).send("User not found");
            }
        }
        else{
            res.status(401).send("Please login first");
        }
    }
    catch(err){
        req.flash("error","Please login first");
        res.status(500).redirect("/");
    }
}