const userService = require('../services/user-service');
const handleError = require('../utils/server-error-handler');

class UserController {

   async registration(req, res) {
       try {
           res.send(await userService.prototype.saveUser(req.body));
       } catch (e) {
           handleError(res, e);
       }
    }

    async ActivateAccount(req, res) {
        try {
            await userService.prototype.activateAccount(req.params.code)
            res.send({message: 'ok'});
        } catch (e) {
            handleError(res, e);
        }
    }

    async login(req, res) {
        try {
            const token = await userService.prototype.login(req.body);
            res.send({token});
        } catch (e) {
            handleError(res, e);
        }
    }
}

module.exports = UserController;
