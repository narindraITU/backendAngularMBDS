let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const  UserSchema = Schema({
    nom: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
});
module.exports = mongoose.model('User', UserSchema);
