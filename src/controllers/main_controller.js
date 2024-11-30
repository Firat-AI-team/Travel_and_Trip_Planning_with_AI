


// Ana sayfaya istek ve yanıt denetimi
const mainPage = (req,res,next) => {
    res.render("home_page");
}



// views klasöründeki dosya isimleriyle ejs aracılığıyla erişilir ve ekrana bastırılır.
const loginPage = (req,res,next) => {
    res.render("login_page");
}

const registerPage = (req,res,next) => {
    res.render("register_page")
}


const login = (req,res,next) => {
    console.log(req.body.email);
    console.log(req.body.password);
}

const register = (req,res,next) => {
    console.log(req.body.name);
    console.log(req.body.surname);
    console.log(req.body.email);
    console.log(req.body.password);
}


// fonksiyonları erişilebilir yapma
module.exports = {
    mainPage,
    loginPage,
    registerPage,
    login,
    register,
}