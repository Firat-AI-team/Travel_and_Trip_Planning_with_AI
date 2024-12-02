
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");




// token oluşturmayı sağlar. Oluşturuken token içinde json olarak sağlamak istenilen veri gönderilir. Örneğin {userId: 1}
const createToken = (user) => {
   const token = jwt.sign(user,process.env.JWT_KEY);
   return token;
}


// token kontrolü yapılıp doğruysa token içeriğini yanlışsa null gönderir
const decodeToken = (token) => {
    let decoded;
    try {
        decoded = jwt.verify(token,process.env.JWT_KEY);
        
    } catch (e) {
        // token hatalıysa burası devreye girer.
        decoded = null;
    }
    return decoded;
}






module.exports = {
    createToken,
    decodeToken,
}