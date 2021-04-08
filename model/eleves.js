let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const  EleveSchema = Schema({
    nom: String,
    prenom: String,
    dateCreated: Date,
});
EleveSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Eleve', EleveSchema);
