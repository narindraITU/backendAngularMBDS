let Assignment = require('../model/assignment');
let MatieresService = require('../services/matieres.service');
let ElevesService = require('../services/eleves.service');
let AssignmentService = require('../services/assignments.service');

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    var aggregateQuery = Assignment.aggregate();
    Assignment.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: 10,
        },
        (err, assignments) => {
            if (err) {
                res.send(err);
            }
            res.send(assignments);
        }
    );
}

// Récupérer un assignment par son id (GET)
async function getAssignment(req, res){
    let assignmentId = req.params.id;
    try{
        console.log(assignmentId);
        const assignment = await Assignment.findById(assignmentId);
        res.json(assignment);
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}

// Ajout d'un assignment (POST)
async function postAssignment(req, res){
    try{
        let assignment = new Assignment();
        assignment.nom = req.body.nom;
        assignment.dateDeRendu = req.body.dateDeRendu;
        assignment.rendu = req.body.rendu;
        assignment.note = req.body.note;
        assignment.remarques = req.body.remarques;
    
        let idmatiere = req.body.idMatiere;
        let ideleve = req.body.idEleve;
        let matiere = await MatieresService.findById(idmatiere);
        let eleve = await ElevesService.findById(ideleve);
        assignment.matiere = matiere;
        assignment.eleve = eleve;
        console.log("POST assignment reçu :");
        console.log(assignment);
    
        let resassignment = await assignment.save();
        res.json({data: resassignment});
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json({message: e.message});
    }    
}

// Update d'un assignment (PUT)
async function updateAssignment(req, res) {
    try{
        let updatedAssignment = await Assignment.findById(req.body._id);
        updatedAssignment.nom = req.body.nom;
        updatedAssignment.dateDeRendu = req.body.dateDeRendu;
        updatedAssignment.rendu = req.body.rendu;
        updatedAssignment.note = req.body.note;
        updatedAssignment.remarques = req.body.remarques;
    
        let idmatiere = req.body.idMatiere;
        let ideleve = req.body.idEleve;
        let matiere = await MatieresService.findById(idmatiere);
        let eleve = await ElevesService.findById(ideleve);
        updatedAssignment.matiere = matiere;
        updatedAssignment.eleve = eleve;
        console.log("POST updatedAssignment reçu :");
        console.log(updatedAssignment);
        
        let result = await Assignment.findByIdAndUpdate(req.body._id, updatedAssignment);

        res.json({data: result});
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json({message: e.message});
    }   
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
