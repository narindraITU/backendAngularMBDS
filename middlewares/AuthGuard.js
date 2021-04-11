var jwt = require('jsonwebtoken');
var config = require('../configurations/config');
const UserService = require('../services/user.service');
const AuthGuard = {
    validateToken: async function(req,res, next){
        try{
            var token = req.headers['x-access-token'];
            if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
            const decoded = await jwt.verify(token,config.secret);
            const user = await UserService.getUser(decoded.id);
            if(!user){
                req.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            req.user = user;
            next();
        }
        catch (e) {
            return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
        }
    },
     validateAdmin(req,res,next){
        const user = req.user;
        if(!user.isAdmin){
            return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        next();
    },
};
module.exports = AuthGuard;
