let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const  MatiereSchema = Schema({
    nomMatiere: {type: String, required: true},
    iconeMatiere: {type: String, required: true},
    nomProfesseur: {type: String, required: true},
    imageProf: {type: String, required: true},
    dateCreated: {type: Date, required: true},
});
MatiereSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Matiere', MatiereSchema);
