const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../helpers/key');
const mailService = require('./mail-service');
const createError = require('../utils/http-error-handler');
const saltRounds = 10;

class UserService {

    async getAllUsers() {
        return await userModel.findAll();
    }

    async saveUser(user) {
        if (!await this.checkIfEmailExist(user.email)) {
            user.password = await this.encodingPassword(user.password);
            user.activationCode = this.generateCode();
            await mailService.sendMail(user)
            return await userModel.create(user);
        } else {
            throw createError(409, 'Email already exist');
        }
    }

    async login(user) {
        const candidate = await userModel.findOne({where: {email: user.email}});
        if (candidate) {
            if (candidate.activated) {
                const passwordResult = bcrypt.compareSync(user.password, candidate.password);
                if (passwordResult) {
                    return this.createJWToken(candidate);
                } else {
                    throw createError(401, 'Password incorrect');
                }
            } else {
                throw createError(403, 'Account not activated');
            }
        } else {
            throw createError(404, 'User Not Found');
        }
    }

    createJWToken(user) {
        const token = jwt.sign({
                email: user.email,
                id: user.id,
            }, keys.jwt,
            {expiresIn: 60 * 60});
        return 'Bearer ' + token;
    }

    async encodingPassword(password) {
        return await bcrypt.hash(password, saltRounds)
    }

    async checkIfEmailExist(email) {
        const res = await userModel.findOne({where: {email: email}});
        return !!res;
    }

    generateCode(length = 10) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async activateAccount(code) {
            const user = await userModel.findOne({where: {activationCode: code}});
            if (user !== null) {

                user.activated = true;
                user.activationCode = '';
                await user.save();
            } else {
                throw createError(404, 'Account not found');
            }
    }
}

module.exports = UserService;
