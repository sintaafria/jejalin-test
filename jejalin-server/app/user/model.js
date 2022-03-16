const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AutoIncreament = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

const userSchema = Schema({
    username: {
        type: String,
        minlength: [3, 'panjang nama minimal 3 karakter'],
        maxlength: [225, 'panjang nama maksimal 225 karakter'],
        required: [true, 'nama harus diisi'],  
    },
    email: {
        type: String,
        required: [true, 'email harus diisi'],
        maxlength: [225, 'panjang email maksimal 225 karakter']
    },
    first_name: {
        type: String,
        minlength: [3, 'panjang nama minimal 3 karakter'],
        maxlength: [225, 'panjang nama maksimal 225 karakter'],
        required: [true, 'nama harus diisi'],
    },
    last_name: {
        type: String,
        minlength: [3, 'panjang nama minimal 3 karakter'],
        maxlength: [225, 'panjang nama maksimal 225 karakter'],
    },
    password: {
        type: String,
        required: [true, 'password harus diisi'],
        maxlength: [225, 'panjang password maksimal 225 karakter']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: [String]
    
}, { timestamps: true });

userSchema.path('email').validate(async function(value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} harus merupakan email yang valid!`);

userSchema.path('email').validate(async function(value) {
    try {
        const count = await this.model('user').count({email: value});
        return !count;
    } catch(err) {
        throw err
    }
}, attr =>  `${attr.value} sudah terdaftar`);

const HASH_ROUND = 10;
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next()
});

const User = model('user', userSchema);
module.exports = User