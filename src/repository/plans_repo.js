const model = require("../models")
const Plan = model.Plan
const getPlans = async ()=>{
    try {
        const findPlans = await Plan.findAll();
    if (findPlans.length!=0){
        return findPlans
    }
    } catch (error) {
        console.log(error)
        return null
    }
    

}
const getPlanFromId = async (planId)=>{
    const findPlan = await Plan.findOne({where:{id:planId}});
    if (findPlan) {
        return findPlan
    }else{
        return null;
    }
}


module.exports = {
    getPlans,getPlanFromId
}


