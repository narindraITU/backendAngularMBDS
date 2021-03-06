let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let eleves = require('./routes/eleves');
let dashboard = require('./routes/dashboard');
let user = require('./routes/users');
let matieres = require('./routes/matieres');
let Usermiddleware = require('./middlewares/AuthGuard');
let mongoose = require('mongoose');
const multer = require('multer');
mongoose.Promise = global.Promise;

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://admin:test@cluster0.5i4ka.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.post(prefix + '/assignments/peupler',Usermiddleware.validateToken,assignment.peupler);
app.get(prefix + '/assignments/byEleves',Usermiddleware.validateToken,assignment.findByEleves);


app.route(prefix + '/assignments')
  .get(Usermiddleware.validateToken,assignment.getAssignments);



app.route(prefix + '/assignments/:id')
  .get(Usermiddleware.validateToken,assignment.getAssignment)
  .delete(Usermiddleware.validateToken,
      Usermiddleware.validateAdmin,
      assignment.deleteAssignment);
app.post(prefix + '/assignments/rendre',
    Usermiddleware.validateToken,
    assignment.rendre);
app.post(prefix + '/assignments/annuler/rendre',
    Usermiddleware.validateToken,
    assignment.annulerRendre);
app.route(prefix + '/assignments')
  .post(Usermiddleware.validateToken,
      Usermiddleware.validateAdmin,
      assignment.postAssignment)
  .put(Usermiddleware.validateToken,
      Usermiddleware.validateAdmin,
      assignment.updateAssignment);

const fileUpload = multer();
app.route(prefix + '/matieres')
    .get(Usermiddleware.validateToken,matieres.load)
    .delete(Usermiddleware.validateToken,Usermiddleware.validateAdmin,matieres.delete)
    .post(Usermiddleware.validateToken,Usermiddleware.validateAdmin,fileUpload.single('image'),matieres.create);
app.get(prefix + '/matieres/all', Usermiddleware.validateToken, matieres.loadAll);

app.route(prefix + '/eleves')
    .post(Usermiddleware.validateToken,eleves.create)
    .get(Usermiddleware.validateToken,eleves.load)
    .delete(Usermiddleware.validateToken,Usermiddleware.validateAdmin,eleves.delete)
    .put(Usermiddleware.validateToken,Usermiddleware.validateAdmin,eleves.update);

app.get(prefix + '/dashboard/counts',Usermiddleware.validateToken,dashboard.getCounts);
app.get(prefix + '/dashboard/stats_assignments',
    Usermiddleware.validateToken,
    dashboard.statistiquesAssignments);
    app.get(prefix + '/eleves/all', Usermiddleware.validateToken, eleves.loadAll);
app.get(prefix + '/dashboard/counts',Usermiddleware.validateToken,dashboard.getCounts);

app.route(prefix + '/user/inscription')
    .post(user.inscription);

app.route(prefix + '/user/me')
    .get(Usermiddleware.validateToken,user.me);

app.route(prefix + '/user/login')
    .post(user.login);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


