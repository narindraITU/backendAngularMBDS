const DashboardService = require('../services/dashboard.service');
const DashboardController = {
    async getCounts(req,res){
        try{
            const countEleves = await DashboardService.countEleves();
            const countMatieres = await DashboardService.countMatieres();
            const countAssignments = await DashboardService.countAssignments();

            res.json({
               eleves: countEleves,
               assignments: countAssignments,
               matieres: countMatieres,
            });
        }
        catch (e) {
            res.status(500);
            res.json({message: e.message});
        }
    }
};
module.exports = DashboardController;
