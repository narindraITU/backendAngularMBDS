let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const  UserSchema = Schema({
    nom: String,
    password: String,
    isAdmin: Boolean,
});
module.exports = mongoose.model('User', UserSchema);
