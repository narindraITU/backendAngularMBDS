let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./routes/assignments');
let eleves = require('./routes/eleves');
let user = require('./routes/users');
let Usermiddleware = require('./middlewares/AuthGuard');
let mongoose = require('mongoose');
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

app.route(prefix + '/assignments')
  .get(Usermiddleware.validateToken,assignment.getAssignments);

app.route(prefix + '/assignments/:id')
  .get(Usermiddleware.validateToken,assignment.getAssignment)
  .delete(Usermiddleware.validateToken,assignment.deleteAssignment);

app.route(prefix + '/assignments')
  .post(Usermiddleware.validateToken,assignment.postAssignment)
  .put(Usermiddleware.validateToken,assignment.updateAssignment);

app.route(prefix + '/eleves')
    .post(Usermiddleware.validateToken,eleves.create)
    .get(Usermiddleware.validateToken,eleves.load)
    .delete(Usermiddleware.validateToken,eleves.delete)
    .put(Usermiddleware.validateToken,eleves.update);

app.route('/matieres');

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


