
const router = require("express").Router();
const controller = require("../controllers/main_controller");


// Gelen istek url-controller eşleştirmeleri
router.get("/",controller.mainPage);

router.get("/login",controller.loginPage);

router.get("/register",controller.registerPage);




router.post("/login",controller.login);

router.post("/register",controller.register);



// routerı erişilebilir yapma
module.exports = router;