let DuplicatedRowException =  require( "../Exceptions/DuplicatedRowException");
let UserService = require('../services/user.service');
let utils = require('../utils/utils');
let UserNotFoundException = require("../Exceptions/UserNotFoundException");
const UserController = {
  inscription: async function (req,res){
      try{
          const token = await UserService.inscription(req.body.name,req.body.password,req.body.isAdmin);
          res.status(200).send({auth: true, token});
      }
      catch (e) {
          console.log(e);
          if(e instanceof DuplicatedRowException){
              res.status(500).send(utils.createError(e.message));
              return ;
          }
          res.status(500).send();
      }
  },
  me: async function(req,res){
      try{
          const user = await UserService.getUser(req.userId);
          if(!user){
              res.status(404).send(utils.createError("Utilisateur inexistant"));
          }
          res.status(200).send(user);
      }
      catch (e) {
          console.log(e);
          res.status(500).send(utils.createError("Un problème est survenu durant l'enregistrement de l'utilisateur"));
      }
  },
  update: async function(req,res){
      try{
          
      }
      catch (e) {
          
      }
  },
  login: async function(req,res){
      try{
          console.log("ato e");
          const token = await UserService.login(req.body.username,req.body.password);
          res.status(200).send({ auth: true, token: token });
      }
      catch (e) {
          console.log(e);
          if(e instanceof UserNotFoundException){
              res.status(404).send(utils.createError("Utilisateur inexistant"));
              return;
          }
          res.status(500).send(utils.createError("Un problème est survenu au niveau du serveur"));
      }
  },
};
module.exports = UserController;
