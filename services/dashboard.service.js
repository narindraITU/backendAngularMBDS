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
    elevesParJour(){
        const aggregatorOpts = [
            {
                $group: {
                    dateCreated: { $dateToString: { format: "%Y-%m-%d", date: "$dateCreated" } },
                    count: { $sum: 1 }
                }
            }
        ];
        return Eleves.aggregate(aggregatorOpts);
    },
    matieresParJour(){
        const aggregatorOpts = [
            {
                $group: {
                    dateCreated: { $dateToString: { format: "%Y-%m-%d", date: "$dateCreated" } },
                    count: { $sum: 1 }
                }
            }
        ];
        return Matieres.aggregate(aggregatorOpts);
    },
    assingmentsParJour(){
        const aggregatorOpts = [
            {
                $group: {
                    dateCreated: { $dateToString: { format: "%Y-%m-%d", date: "$dateCreated" } },
                    count: { $sum: 1 }
                }
            }
        ];
        return Assignments.aggregate(aggregatorOpts);
    },
};
module.exports = DashboardService;
