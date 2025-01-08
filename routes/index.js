const express = require('express');
const router = express.Router();
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");




router.get("/",(req,res)=>{
    let error = req.flash('error');
    res.render("index",{error,loggedin:false});
    });



    router.get('/shop', async (req, res) => {
        try {
            let products = await productModel.find();
            console.log(products);
           // res.send(products);
            res.render("shop", { products }); 
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    });

    router.get('/cart', async (req, res) => {
        let user = await userModel.findOne({email:req.user.email}).populate("cart");

        const bill =2500; //Number(user.cart[0].price) - Number(user.cart[0].discount) ;
        
        res.render("cart",{user,bill});
    });


    router.get('/addtocart/:productid', async (req, res) => {
        try {
            // Assuming you have some form of user authentication and user is stored in session
            const user = await userModel.findOne({ email: req.user.email }); // Use session or authenticated user
    
            if (!user) {
                req.flash("error", "User not found");
                return res.redirect("/login"); // Redirect to login if user not found
            }
    
            if (!user.cart) {
                user.cart = []; // Initialize cart if it doesn't exist
            }
    
            user.cart.push(req.params.productid); // Add product ID to cart
            await user.save(); // Save updated user to database
    
            req.flash("success", "Product added to cart successfully");
            res.redirect("/shop"); // Redirect to shop page
        } catch (error) {
            console.error(error);
            req.flash("error", "Something went wrong");
            res.redirect("/shop"); // Redirect to shop page on error
        }
    });






module.exports = router;