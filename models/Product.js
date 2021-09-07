const mongoose = require('mongoose');

// create product table schema
const ProductShcema = new mongoose.Schema({
    id : {
        type: Number,
        required: true
    },
    name : {
        type: String,
        required: true
    },   
    description : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    }
});

const Product = mongoose.model('Product', ProductShcema);

module.exports = Product;