const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../models/user');
const keys = require('../helpers/key');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await userModel.findOne({where: {id: payload.id}, attributes: ['id', 'email']});
                if (user) {
                    done(null, user)
                } else {
                    done(null, false);
                }
            } catch (e) {
                console.log(e);
            }
        })
    )
}
