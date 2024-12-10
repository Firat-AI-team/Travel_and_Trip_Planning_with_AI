const model = require("../models")
const Plan = model.Plans

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
const getPlansFromUserId = async (userId) => {
    const plans = await Plan.findAll({ where: { userId: userId } }); 
    if (plans.length > 0) {
        return plans;
    } else {
        return null;
    }
};

module.exports = {
    getPlans,getPlanFromId
}


