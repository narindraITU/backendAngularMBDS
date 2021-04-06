let Matieres = require('../model/matiere');
const cloudinary = require("cloudinary").v2;
const configurations = require("../configurations/config");
const DatauriParser = require('datauri/parser');
const moment = require("moment");
const streamifier = require('streamifier');
cloudinary.config({
    cloud_name: configurations.cloudinary_cloud_name,
    api_key: configurations.cloudinary_api_key,
    api_secret: configurations.cloudinary_api_secret,
});
let streamUpload = (file) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

const MatieresService = {
    create: async function(image,nom,icone,nomProf){
        try{
            let result = await streamUpload(image);
            console.log(result);
            return Matieres.create({
                nomMatiere: nom,
                iconeMatiere: icone,
                nomProfesseur: nomProf,
                imageProf: result.url,
            });
        }
        catch (e) {
            console.log(e);
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
