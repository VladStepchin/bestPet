const User = require('../models/User')

class UserModule{
    static create({googleId, email, password, poster, roles}){
        console.log('Result', googleId, email, password, poster);
        return new User({googleId: googleId || '', email, password: password || '', poster, roles}).save()
    }    
    static findByCriteria(criteria){
        return User.findOne(criteria).exec()
    }
}

module.exports = UserModule;