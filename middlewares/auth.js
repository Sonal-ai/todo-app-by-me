const { getUser } = require("../services/auth");


// async function restrictLoggedInUserOnly(req,res,next) {
//     const token = req.cookies.token;
//     if(!token){
//         return res.redirect('/login')
//     }
//     const user = getUser(token);
//     if(!user){
//         return res.redirect('/login')
//     }
//     req.user = user;
//     next()
// }

// async function checkAuth(req,res,next) {
//     const token = req.cookies.token;
//     const user = getUser(token);
//     req.user = user;
//     next()
// }

function checkForAuthentication(req,res,next){
    const tokenValue = req.cookies.token;
    req.user=null;
    if(!tokenValue){
        return next()
    }
    const token = tokenValue;
    const user= getUser(token);
    req.user=user;
    return next();
}

function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) res.redirect('/login')
        if(!roles.includes(req.user.role)){
            res.end("only for admin user can't access it.")
        }
        return next(); 
    }
}

// module.exports = {
//     restrictLoggedInUserOnly,
//     checkAuth,
// }

module.exports= {
    checkForAuthentication,
    restrictTo,
}