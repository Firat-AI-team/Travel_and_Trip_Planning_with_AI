
const authRepo = require("../repository/auth_repo");
const tokenService = require("../services/token_service");

const plansRepo = require("../repository/plans_repo");

// Ana sayfaya istek ve yanıt denetimi
const mainPage = (req, res, next) => {
    let plans = plansRepo.getPlans();
    res.render("home_page", { plans });
    
};

const plansPage = (req,res,next) => {
    res.render("my_plans");
}

const planDetails = (req,res,next) => {
    res.render("plan_details");
}




// views klasöründeki dosya isimleriyle ejs aracılığıyla erişilir ve ekrana bastırılır.
const loginPage = (req,res,next) => {
    let msg;
    if(req.session.msg){
        msg = req.session.msg;
    }
    res.render("login_page",{"msg":msg});
}



const registerPage = (req,res,next) => {
    let msg;
    if(req.session.msg){
        msg = req.session.msg;
    }
    res.render("register_page",{"msg":msg})
}







const login = async (req,res,next) => {
    if(req.body.email == "" || req.body.password == ""){
        req.session.msg = "Email veya Şifre boş olamaz!";
        res.redirect("/login");
    }else{
        let findUser = await authRepo.loginUser(req.body);
        if(findUser == null ){
            req.session.msg = "Hatalı giriş!";
            res.redirect("/login");
        }else{
            let token = tokenService.createToken({userId:findUser.id});
            req.session.token = token;
            res.redirect("/");
        }
    }
    
}





const register = async (req,res,next) => {
    if(req.body.email == "" || req.body.password == "" || req.body.name == ""){
        req.session.msg = "Boş alanları eksiksiz ve tam şekilde doldurun!";
        res.redirect("/register");
    }else{
        let findUser = await authRepo.createUser(req.body);
        if(findUser == null ){
            req.session.msg = "Kayıt olunamadı!";
            res.redirect("/register");
        }else{
            req.session.msg = "Kayıt olundu. Lütfen giriş yapın!";
            res.redirect("/login");
        }
    }
}


const logout = (req,res,next) => {
    if(req.session.token){
        req.session.token = undefined;
        req.session.msg="Çıkış Yapıldı!";
    }
    res.redirect("/");
}



// fonksiyonları erişilebilir yapma
module.exports = {
    mainPage,
    loginPage,
    registerPage,
    login,
    register,
    logout,
    plansPage,
    planDetails
}