
// Hatalı Url Giriş Yönlendirmesi
const error = (req,res,next) => {
    res.json({"Opps" : "Aradığınız Url Bulunamadı!"});
}


module.exports = error;