const model = require("../models")
const Location = model.Locations

const getLocations = async ()=>{
    try {
        const findLocations = await Plan.findAll();
    if (findLocations.length!=0){
        return findLocations
    }
    } catch (error) {
        console.log(error)
        return null
    }
    

}