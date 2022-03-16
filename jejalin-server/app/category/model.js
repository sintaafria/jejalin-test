const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema = Schema({
    name: {
        type: String,
        minlength: [3, 'panjang nama category minimal 3 karakter'],
        maxlength: [20, 'panjang nama category minimal 20 karakter'],
        required: [true, 'nama kategori harus diisi'],  
    }
});

const Category = model('category', categorySchema);
module.exports = Category;