
const bcrypt = require("bcrypt");



// Önemli bilgi şifreleme servisi

const hashPassword = (password) => {
    let hash = bcrypt.hashSync(password,10);
    return hash;
}


// şifrelenmiş veri ile gelen veriyi karşılaştırıp true/false döndürür.
const comparePassword = (password,hashed) => {
    return bcrypt.compareSync(password,hashed);
}


module.exports = {
    hashPassword,
    comparePassword,
}