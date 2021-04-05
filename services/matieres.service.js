let Matieres = require('../model/matiere');
const cloudinary = require("cloudinary").v2;
const configurations = require("../configurations/config");
cloudinary.config({
    cloud_name: configurations.cloudinary_cloud_name,
    api_key: configurations.cloudinary_api_key,
    api_secret: configurations.cloudinary_api_secret,
});
const MatieresService = {
    create: async function(image,nom,nomMatiere,icone,nomProf){
        try{
            const resultat = await cloudinary.upload({
               image,
            });
            return Matieres.create({
                nom,
                nomMatiere,
                iconeMatiere: icone,
                nomProfesseur: nomProf,
            });
        }
        catch (e) {
            throw new Error("L'image n'a pas pu être uploadé");
        }
    },
    load: function (page) {
        var aggregateQuery = Matieres.aggregate();
        return Matieres.aggregatePaginate(
            aggregateQuery,
            {
                page: parseInt(page) || 1,
                limit: 10,
            }
        );
    }
};
module.exports = MatieresService;
