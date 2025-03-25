const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
});

const MenuItem = mongoose.model("menuItem", menuItemSchema); 

module.exports = MenuItem;