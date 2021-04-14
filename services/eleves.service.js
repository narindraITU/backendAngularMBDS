let Eleves = require('../model/eleves');
let AssignmentService = require('../services/assignments.service');

const ElevesService = {
    create: (nom,prenom) => {
            return Eleves.create({
                nom,
                prenom,
                dateCreated: new Date(),
            });
    },
    searchByEleve(page,idEleve){
        var aggregateQuery = Assignment.aggregate([
            {$match: {'eleve._id': new ObjectId(idEleve)}}
        ]);
        console.log(idEleve,aggregateQuery);
        return Assignment.aggregatePaginate(
            aggregateQuery,
            {
                page: parseInt(page) || 1,
                limit: 10,
            }
        );
    },
     delete: async (id) => {
       const result =  await AssignmentService.deleteToCorrespondingEleve(id);
       return Eleves.findByIdAndRemove(id);
    },
    update: async (nom,prenom,id) => {
        let newEleve = await Eleves.findByIdAndUpdate(id, {
            nom,
            prenom
        });
        newEleve = await Eleves.findById(id);
        const resultat = await AssignmentService.updateToCorrespondingEleve(id,newEleve);
        console.log(resultat);
        return resultat;
    },
    load: (page) => {
        var aggregateQuery = Eleves.aggregate();
        return Eleves.aggregatePaginate(
            aggregateQuery,
            {
                page: parseInt(page) || 1,
                limit: 10,
            }
        );
    },
    loadAll: function(){
        return Eleves.find({});
    },
    findById(id){
        return Eleves.findById(id);
    }
};
module.exports = ElevesService;
