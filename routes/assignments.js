let Assignment = require('../model/assignment');
let AssignmentService = require('../services/assignments.service');
let MatieresService = require('../services/matieres.service');
let ElevesService = require('../services/eleves.service');
const NotFoundException = require('../Exceptions/NotFoundException');
const DejaRenduException = require('../Exceptions/DejaRenduException');

const AssignmentController = {
    // Récupérer tous les assignments (GET)
    getAssignments: function (req, res){
    const isRendu = req.query.rendu === "true" ? true : false;
    var aggregateQuery = Assignment.aggregate([{ $match: { rendu: isRendu }}]);
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
},
    // Récupérer un assignment par son id (GET)
    getAssignment: async function (req, res){
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
    },
    async peupler(req,res){
        try{
            const result = await AssignmentService.peupler(req.body);
            res.json(result);
        }
        catch (e) {
            console.log(e);
            res.send(e.message);
        }
    },
    // Ajout d'un assignment (POST)
    postAssignment: async function (req, res){
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
    },
    // Update d'un assignment (PUT)
    updateAssignment: function (req, res) {
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({message: 'updated'})
        }
        // console.log('updated ', assignment)
    });
},
    // suppression d'un assignment (DELETE)
    deleteAssignment: function (req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.nom} deleted`});
    })
},
    rendre: async function (req,res){
        try{
            const resultat = await AssignmentService.rendre(req.body.id,req.body.note,req.body.description);
            res.json(resultat);
        }
        catch (e) {
            res.status(500);
            if(e instanceof NotFoundException){
                res.status(404);
            }
            res.json(e.message);
        }
    },
    annulerRendre: async function (req,res){
        try{
            const resultat = await AssignmentService.annulerRendre(req.body.id);
            res.json(resultat);
        }
        catch (e) {
            res.status(500);
            if(e instanceof NotFoundException){
                res.status(404);
            }
            res.json(e.message);
        }
    },
    findByEleves: async function (req,res){
        try{
            console.log(req.query.page,req.query.id);
            const result = await AssignmentService.searchByEleve(req.query.page,req.query.id);
            res.json(result);
        }
        catch (e) {
            console.log(e);
            res.status(500);
            res.json(e.message);
        }
    },
};




module.exports = AssignmentController;
