let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const  MatiereSchema = Schema({
    nomMatiere: String,
    iconeMatiere: String,
    nomProfesseur: String,
    imageProf: String,
});
MatiereSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Matiere', MatiereSchema);
