const jwt = require("jsonwebtoken")

const app = (req, res, next) => {
    try {
        let token= req.header.authorization;
        if(token){
            // to split the token information
            token = token.split(" ")[1];
            // to verify the web token 
            let user = jwt.verify(token,process.env.JWT_SECRET);
            req.userId = user.id;

        }
        
        next();


    }catch(error){
        console.log(error);
        res.status(401).json({message: "Unauthorized User"})
    }
}

module.exports = app;