
const authRepo = require("../repository/auth_repo");
const tokenService = require("../services/token_service");

const plansRepo = require("../repository/plans_repo");
const locationsRepo = require("../repository/locations_repo");

// Ana sayfaya istek ve yanıt denetimi
const mainPage = async (req, res, next) => { //lokasyonlar
    let locations = await locationsRepo.getLocations();  
    let images = require("../tools/img_urls.js");
    res.render("home_page", { "locations":locations , "images":images});
    
};

const plansPage = async (req,res,next) => {
    let decoded = tokenService.decodeToken(req.session.token);
    let plans = await plansRepo.getPlansFromUserId(decoded.userId); 
    res.render("my_plans", { "plans":plans });
}


const planDetails = async (req,res,next) => {  // show plan
    let location = await locationsRepo.getLocationFromId(parseInt(req.params.id))
    let img = require("../tools/img_urls.js")[location.id-1];
    res.render("plan_details",{"location":location , "imgUrl": img});
}

const addPlanPage = async (req,res,next) => {
    let location = await locationsRepo.getLocationFromId(parseInt(req.params.id))
    let img = require("../tools/img_urls.js")[location.id-1];
    res.render("add_plan", { "location":location , "imgUrl": img });
}

const addPlan = async (req,res,next) => {
    let decoded = tokenService.decodeToken(req.session.token);
    console.log(req.body);
    let plans = await plansRepo.createPlan({
        userId: decoded.userId,
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        locationId: req.body.locationId
    }); 
    if(plans != null){
        req.session.msg="Seyahat Planınız Oluşturuldu!";
        res.redirect("/plans");
    }else{
        req.session.msg="Opps Plan Oluşturulamadı!";
        res.redirect("/");
    }
}


const suggestionPage = async (req,res,next) => {
    let location = await locationsRepo.getRandomLocation();
    let img = require("../tools/img_urls.js")[location.id-1];
    res.render("suggestion_page", { "location":location , "imgUrl": img  });
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
    planDetails,
    addPlan,
    addPlanPage,
    suggestionPage,
}