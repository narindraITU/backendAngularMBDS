let ElevesService = require('../services/eleves.service');

const ElevesController = {
    load: async function(req,res){
        try{
            const resultats = await ElevesService.load(req.query.page);
            res.json(resultats);
        }
        catch (e) {
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    },
    update: async function(req,res){
        try{
            const resultats = await ElevesService.update(req.body.nom,req.body.prenom,req.query.id);
            res.json({message: "L'élève a été mis à jour"});
        }
        catch (e) {
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    },
    delete: async function(req,res){
        try{
            const resultats = await ElevesService.delete(req.query.id);
            res.json({message: "L'élève a été supprimé"});
        }
        catch (e) {
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    },
    create: async function(req,res){
        try{
           const result = await ElevesService.create(req.body.nom,req.body.prenom);
           res.json({data: result});
        }
        catch (e) {
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    },
    findById: async function(req, res){
        try{
            const result = await ElevesService.findById(req.id);
            res.json({data: result});
        }
        catch(e){
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    },
    loadAll: async function(req, res){
        try{
            const result = await ElevesService.loadAll();
            res.json({data: result});
        }
        catch(e){
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    },
};
module.exports = ElevesController;
