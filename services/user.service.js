var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../configurations/config');
let User = require('../model/user');
var DuplicatedRowException = require('../Exceptions/DuplicatedRowException');
var UserNotFoundException = require('../Exceptions/UserNotFoundException');
const UserService = {
  login: async function(username,password){
    try{
        const user = await User.findOne({nom: username});
        if(!user){
            throw new UserNotFoundException("Cet utilisteur n'existe pas");
        }
        var isPasswordValid = bcrypt.compareSync(password,user.password);
        if(!isPasswordValid){
            throw new UserNotFoundException("Cet utilisteur n'existe pas");
        }
        return this.token(user);
    }
    catch (e) {
        console.log(e);
        throw e;
    }
  },
  token: async function(user){
      var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: config.duration,
      });
      return token;
  },
  inscription: async function(username,password,isAdmin = false) {
      try{
          var hashedPassword = bcrypt.hashSync(password);
          //check for duplicate users
          let duplicatedUser = await User.findOne({
              "nom": username,
          });
          if(duplicatedUser){
              throw new DuplicatedRowException('Cet utilisateur existe déjà');
          }
          let user = await User.create({
              nom: username,
              password: hashedPassword,
              isAdmin,
          });
          return this.token(user);
      }
      catch (e) {
          console.log(e);
          throw e;
      }
  },
  getUser: async function(id){
      try{
          const user = await User.findById(id, {password: 0});
          return user;
      }
      catch (e) {
          console.log(e);
          throw e;
      }
  },
};
module.exports = UserService;

