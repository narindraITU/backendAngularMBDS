const Assignment = require('../model/assignment');
const NotFoundException = require('../Exceptions/NotFoundException');
const DejaRenduException = require('../Exceptions/DejaRenduException');
var ObjectId = require('mongoose').Types.ObjectId;
const AssignmentsService = {
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
