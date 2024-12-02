// .env dosyası erişim için konfigürasyon ayarı
const dotenv = require("dotenv").config();


// API ayaklandırma için gerekli modül eklemeleri
const express = require("express");
const app = express();



// router erişimi
const mainRouter = require("./src/routers/main_router");



// Middleware erişimi
const wrongUrlMiddleware = require("./src/middlewares/wrong_url_middleware");


// "/" urlsi üzerinden public klasöründeki verilere erişmeyi sağlar
app.use(express.static("public"));



// post metoduyla body içerisinde veri gönderebilmeyi sağlar.
app.use(express.json());
app.use(express.urlencoded({extended:true}));



// EJS ile arayüzü göstermeyi ve arayüze controller üzerinden veri gönderip kullanabilmeyi sağlar.
// ejs engine konfigürasyon ayarları yapılır.
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./src/views"));

app.use(expressLayout);





// session konfigürasyonu
const session = require("express-session");
app.use(session(
    {
        secret:process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {  }
    }
));




// server route konfigürasyonu
app.use("/",mainRouter);


// Hatalı url yönlendirmesi (mainRouter a girmeyen url istekleri buraya girecektir!)
app.use(wrongUrlMiddleware);





// Server aktifleştirme
app.listen(process.env.PORT,()=>{
    console.log(process.env.PORT," Portta server aktif.");
});