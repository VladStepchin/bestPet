const JWT = require('jsonwebtoken');
exports.auth = (req,res,next) => {
    if(req.user || req.method === 'OPTIONS'){
        return next();
    }
    try {
        const token = req.headers?.cookie.split('=')[1];
        if(!token){
            return res.sendStatus(403).json('User is not authorized')
        }
        const decodedData = JWT.verify(token, process.env.SECRET)
        req.user = decodedData;
        req.user['name'] = req.user['email'];

        console.log(req.user);
        return next();
        
    } catch(err){
        console.log(err);
        return res.sendStatus(403).json('User is not authorized')
    }
}
