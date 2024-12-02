const tokenService = require("../services/token_service");
const authRepo = require("../repository/auth_repo");


// router devreye girdiğinde controller fonksiyonundan önce devreye girip cookie kısmına gönderilen token kontrolü yapar.
const authControl = async (req,res,next) => {
    if(req.session.token){
        let decoded = tokenService.decodeToken(req.session.token);
        if(decoded == null){
            req.session.msg = "Lütfen önce giriş yapın";
            res.redirect("/login");
        }else{
            let findUser = await authRepo.findUserFromId(decoded);
            if(findUser == null){
                req.session.msg = "Lütfen önce giriş yapın";
                res.redirect("/login");
            }else{
                // Hatasız şekilde controller a devam etmesine sağlanır.
                next();
            }
        }
    }else{
        req.session.msg = "Lütfen önce giriş yapın";
        res.redirect("/login");
    }
}


module.exports = authControl;