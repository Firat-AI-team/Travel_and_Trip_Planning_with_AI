
const router = require("express").Router();
const controller = require("../controllers/main_controller");
const auth_middleware = require("../middlewares/auth_control_middleware");


// Gelen istek url-controller eşleştirmeleri
router.get("/",auth_middleware,controller.mainPage);

router.get("/login",controller.loginPage);

router.get("/register",controller.registerPage);




router.post("/login",controller.login);

router.post("/register",controller.register);

router.post("/logout",controller.logout);



// routerı erişilebilir yapma
module.exports = router;