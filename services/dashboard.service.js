let Matieres = require('../model/matiere');
let Eleves = require('../model/eleves');
let Assignments = require('../model/assignment');

const DashboardService = {
    countEleves(){
        return Eleves.countDocuments();
    },
    countAssignments(){
        return Assignments.countDocuments();
    },
    countMatieres(){
        return Matieres.countDocuments();
    },
    countAssignmentsByRendu(isRendu){
        return Assignments.countDocuments({rendu: isRendu});
    },
    elevesParJour(){
        const aggregatorOpts = [
            {
                $group: {
                    _id: {
                        dateCreated: { $dateToString: { format: "%d-%m-%Y", date: "$dateCreated" } },
                    },
                    count: { $sum: 1 }
                }
            }
        ];
        return Eleves.aggregate(aggregatorOpts);
    },
    assignmentsParAn(){
        const aggregatorOpts = [
            {
                $group: {
                    _id: {
                        dateCreated: { $dateToString: { format: "%Y", date: "$dateDeRendu" } },
                    },
                    count: { $sum: 1 }
                }
            }
        ];
        return Assignments.aggregate(aggregatorOpts);
    },
    assignmentsParMois(){
        const aggregatorOpts = [
            {
                $group: {
                    _id: {
                        dateCreated: { $dateToString: { format: "%m-%Y", date: "$dateDeRendu" } },
                    },
                    count: { $sum: 1 }
                }
            }
        ];
        return Assignments.aggregate(aggregatorOpts);
    },
    matieresParJour(){
        const aggregatorOpts = [
            {
                $group: {
                    _id: {
                        dateCreated: { $dateToString: { format: "%d-%m-%Y", date: "$dateCreated" } },
                    },
                    count: { $sum: 1 }
                }
            }
        ];
        return Matieres.aggregate(aggregatorOpts);
    },
    assignmentsParJour(){
        const aggregatorOpts = [
            {
                $group: {
                    _id: {
                        dateCreated: { $dateToString: { format: "%d-%m-%Y", date: "$dateDeRendu" } },
                    },
                    count: { $sum: 1 }
                }
            }
        ];
        return Assignments.aggregate(aggregatorOpts);
    },
    assignmentsParJourWithRenduFilter(rendu = false){
        const aggregatorOpts = [
            {$match: { rendu }},
            {
                $group: {
                    _id: {
                        dateCreated: { $dateToString: { format: "%d-%m-%Y", date: "$dateDeRendu" } },
                    },
                    count: { $sum: 1 }
                }
            }
        ];
        return Assignments.aggregate(aggregatorOpts);
    },
};
module.exports = DashboardService;
