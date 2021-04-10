let Assignment = require('../model/assignment');
let MatieresController = require('../routes/matieres');
let ElevesController = require('../routes/eleves');

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
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.note = req.body.note;
    assignment.remarques = req.body.remarques;

    let idmatiere = req.body.idMatiere;
    let ideleve = req.body.idEleve;
    let matiere = MatieresController.findById(idmatiere);
    let eleve = ElevesController.findById(ideleve);
    assignment.matiere = matiere;
    assignment.eleve = eleve;
    console.log("POST assignment reçu :");
    console.log(assignment);

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }
      // console.log('updated ', assignment)
    });
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
