const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minLenght:3,
        trim:true
    },
    email:String,
    password:String,
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
    }],
    
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    picture:String

});


const User = mongoose.models.user || mongoose.model('User', userSchema);


module.exports = User;