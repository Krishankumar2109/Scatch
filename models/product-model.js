const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image: Buffer, 
    name: { type: String, required: true }, 
    price: { type: Number, required: true },
    discount: {
        type: Number,
        default: 0,
    },
    bgColor: String,
    panelColor: String,
    textColor: String,
});

// Exporting the model with a singular name (Product)
module.exports = mongoose.model("Product", productSchema); 