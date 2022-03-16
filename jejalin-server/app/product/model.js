const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = Schema({
    name: {
        type: String,
        minlength: [3, 'panjang nama makanan minimal 3 karakter'],
        required: [true, 'nama makanan harus ada'],  
    },
    description: {
        type: String,
        maxlength: [1000, 'panjang deskripsi minimal 1000 karakter']
    },
    price: {
        type: Number,
        default: 0
    },
    image_url: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    }
}, { timestamps: true });

const Product = model('product', productSchema);
module.exports = Product