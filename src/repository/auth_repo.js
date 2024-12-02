const model = require("../models");
const User = model.user;
const bcryptService = require("../services/bcrypt_service");


const createUser = async (body) => {
    try {
        const findEmail = await User.findOne({where:{email:body.email}});
        if(findEmail){
            return null;
        }
        let hashedPassword = await bcryptService.hashPassword(body.password);
        const user = User.build({
            name: body.name,
            email: body.email,
            password: hashedPassword,
        });

        await user.save();
        console.log("user created");

        return user;  // Kullanıcıyı döndür
    } catch (error) {
        console.log("Oppss! Error:", error);
        return null;  // Hata durumunda null döndür
    }
}




const loginUser = async (body) => {
    try {
        const findUser = await User.findOne({where:{email:body.email}});
        if(findUser){
            let passwordVerify = bcryptService.comparePassword(body.password,findUser.password);
            if(passwordVerify){
                return findUser;
            }else{
                return null;
            }
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }
    
}




// token üzerindeki id ile kullanıcı sorgusu için kullanıcak.
const findUserFromId = async (body) => {
    try {
        const findUser = await User.findOne({where:{id:body.userId}});
        if(findUser){
            return findUser;
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }

}




// gelen kullanıcı id si üzerinden kaydedilecek plan listesini veritabanına ekler. Gelen plan listesi ekleme silme ve tüm işlemleri tamamlanmış tam liste olmalı veri kaybı olmaması için.
// eski liste yerine direk yeni gelen liste kaydedilir
const setSavedPlan = async (userId,plans) => {
    try {
        const updatedUser = await User.update({savedplans:plans},{where:{id:userId}});
        if(updatedUser){
            return updatedUser;
        }else{
            return null;
        }
        
    } catch (error) {
        return null;
    }
}


module.exports = {
    createUser,
    loginUser,
    findUserFromId,
    setSavedPlan,
}