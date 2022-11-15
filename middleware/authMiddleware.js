const JWT = require('jsonwebtoken');

exports.auth = (req,res,next) => {
    if(req.user || req.method === 'OPTIONS'){
        return next();
    }
    try {
        let token = null;
        let cookiePosition = req.headers.cookie?.indexOf('token=');
        
        if(~cookiePosition){
            token = req.headers.cookie?.slice(cookiePosition+6);
        }
        
        if(!token){
            return res.json('User is not authorized')
        }
        const decodedData = JWT.verify(token, process.env.SECRET)
        req.user = decodedData;
        req.user['name'] = req.user['email']; // fix

        console.log(req.user);
        return next();
        
    } catch(err){
        console.log(err);
        return res.json('User is not authorized')
    }
}

exports.showNameMiddleware = (req,res,next) => {
    if(req.user || req.method === 'OPTIONS'){
        return next();
    }
    try {
        let token = null;
        let cookiePosition = req.headers?.cookie?.indexOf('token=');
        
        if(~cookiePosition){
            token = req.headers.cookie?.slice(cookiePosition+6);
        }
        
        if(!token){
            return next();
        }
        const decodedData = JWT.verify(token, process.env.SECRET)
        req.user = decodedData;
        req.user['name'] = req.user['email'];

        console.log(req.user);
        return next();
        
    } catch(err){
        console.log(err);
        return next();
    }
}