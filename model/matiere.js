let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const  MatiereSchema = Schema({
    nom: String,
    nomMatiere: String,
    iconeMatiere: String,
});
module.exports = mongoose.model('Matiere', MatiereSchema);