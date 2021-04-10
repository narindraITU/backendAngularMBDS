const DashboardService = require('../services/dashboard.service');
const DashboardController = {
    async getCounts(req,res){
        try{
            const countEleves = await DashboardService.countEleves();
            const countMatieres = await DashboardService.countMatieres();
            const countAssignments = await DashboardService.countAssignments();
            const countAssignmentsRendus = await
                DashboardService.countAssignmentsByRendu(true);
            const countAssignmentsNonRendus = await
                DashboardService.countAssignmentsByRendu(false);
            res.json({
               eleves: countEleves,
               assignments: countAssignments,
               assignments_rendus: countAssignmentsRendus,
               assignments_nonrendus: countAssignmentsNonRendus,
               matieres: countMatieres,
            });
        }
        catch (e) {
            res.status(500);
            res.json({message: e.message});
        }
    },
    async statistiquesAssignments(req,res){
        try{
            const stat_days = await DashboardService.assignmentsParJour();
            const stat_days_rendu = await DashboardService.assignmentsParJourWithRenduFilter(true);
            const stat_days_nonrendu = await
                DashboardService.assignmentsParJourWithRenduFilter(false);

            const matieres_par_jour = await DashboardService.matieresParJour();
            const eleves_par_jour = await DashboardService.elevesParJour();
            res.json({
               stat_days,
               stat_days_rendu,
               stat_days_nonrendu,
               matieres_par_jour,
               eleves_par_jour,
            });
        }
        catch (e) {
            console.log(e);
            res.status(500);
            res.json({message: e.message});
        }
    },
};
module.exports = DashboardController;
