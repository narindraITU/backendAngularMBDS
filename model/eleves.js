let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const  EleveSchema = Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    dateCreated: {type: Date, required: true},
});
EleveSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Eleve', EleveSchema);
