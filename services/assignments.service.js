const Assignment = require('../model/assignment');
const NotFoundException = require('../Exceptions/NotFoundException');
const DejaRenduException = require('../Exceptions/DejaRenduException');
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
    }
};
module.exports = AssignmentsService;
