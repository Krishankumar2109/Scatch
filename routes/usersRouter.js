const express =  require("express");
const router = express.Router();

//const generateToken = require("../utils/generateToken,js");
const {generateToken} = require("../utils/generateToken");
const {registeredUser, loginUser,logoutUser} = require("../controllers/authController");

router.get("/users",function(req,res){
    res.send("Users Route");
});


router.post("/register", registeredUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);




module.exports = router;




