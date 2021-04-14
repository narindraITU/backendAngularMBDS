let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let AssignmentSchema = Schema({
    dateDeRendu:{type: Date, required: true},
    nom: {type: String, required: true},
    rendu: {type: Boolean, required: true},
    matiere: {type: Object, required: true},
    eleve: {type: Object, required: true},
    note: {type: Number, required: false, min: 0, max: 20},
    remarques: {type: String, required: false},
});
AssignmentSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
