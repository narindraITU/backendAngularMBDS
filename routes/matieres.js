const MatieresService = require('../services/matieres.service');
let MatiereService = require('../services/matieres.service');
const MatieresController = {
    load: async function(req,res){
        try{
            const resultats = await MatiereService.load(req.query.page);
            res.json(resultats);
        }
        catch (e) {
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    },
    delete: async function(req,res){
        try{
            const resultats = await MatiereService.delete(req.query.id);
            res.json({message: "La matière a été supprimée"});
        }
        catch (e) {
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    },
    create: async function(req,res){
        try{
            const result = await MatiereService
                .create(req.file,
                    req.body.nom,
                    req.body.icone,
                    req.body.nomProf);
            res.json({data: result});
        }
        catch (e) {
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    },
    loadAll: async function(req, res){
        try{
            const result = await MatieresService.loadAll();
            res.json({data: result});
        }
        catch(e){
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    },
    findById: async function(req, res){
        try{
            const result = await MatiereService.findById(req.id);
            res.json({data: result});
        }
        catch(e){
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    }
};
module.exports = MatieresController;
