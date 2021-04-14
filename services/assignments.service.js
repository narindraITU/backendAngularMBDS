const Assignment = require('../model/assignment');
const NotFoundException = require('../Exceptions/NotFoundException');
const MatiereService = require('../services/matieres.service');
const DejaRenduException = require('../Exceptions/DejaRenduException');
var ObjectId = require('mongoose').Types.ObjectId;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const AssignmentsService = {
    search(page,rendu,tableau_eleves,tableau_matieres){
        const criterias = { rendu: rendu };
        if(tableau_eleves.length!=0){
            tableau_eleves = tableau_eleves.map(value => new ObjectId(value));
            criterias["eleve._id"] = { "$in": tableau_eleves };
        }
        if(tableau_matieres.length!=0){
            tableau_matieres = tableau_matieres.map(value => new ObjectId(value));
            criterias["matiere._id"] = { "$in": tableau_matieres };
        }
        var aggregateQuery = Assignment.aggregate( [ { $match: criterias}]);
        return Assignment.aggregatePaginate(
            aggregateQuery,
            {
                page: parseInt(page) || 1,
                limit: 10,
            }
        );
    },
    async peupler(body){
        let assignment = new Assignment();
        assignment.nom = body.nom;
        assignment.dateDeRendu = body.dateDeRendu;
        assignment.rendu = body.rendu;
        assignment.note = getRandomInt(0,2) === 1 ? getRandomInt(0,20) : null;
        assignment.remarques = "";
        const listematieres = await MatiereService.loadAll();
        const listeEleves = await EleveService.loadAll();
        assignment.matiere = listematieres[getRandomInt(0,listematieres.length)];
        assignment.eleve = listeEleves[getRandomInt(0,listeEleves.length)];
        return await assignment.save();
    },
    async rendre(id,note,description){
        const assignment = await Assignment.findById(id);
        if(!assignment){
            throw new NotFoundException(`ce devoir n'existe pas`);
        }
        if(assignment.rendu){
            throw new DejaRenduException(`ce devoir a déjà été rendu`);
        }
        assignment.rendu = true;
        assignment.note = note;
        assignment.remarques = description;
        assignment.dateDeRendu = new Date();
        const resultat = await Assignment.findByIdAndUpdate(id, assignment);
        return resultat;
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
    deleteToCorrespondingMatiere(id){
        return Assignment.deleteMany({'matiere._id': new ObjectId(id)});
    },
    updateToCorrespondingEleve(id,newEleve){
        return Assignment.updateMany({'eleve._id': new ObjectId(id)}, { $set: { "eleve" : newEleve } });
    },
    async deleteToCorrespondingEleve(id){
        return Assignment.deleteMany({
            "eleve._id":new ObjectId(id),
        });
    },
    async annulerRendre(id){
        const assignment = await Assignment.findById(id);
        if(!assignment){
            throw new NotFoundException(`ce devoir n'existe pas`);
        }
        assignment.rendu = false;
        const resultat = await Assignment.findByIdAndUpdate(id, assignment);
        return resultat;
    }
};
module.exports = AssignmentsService;
