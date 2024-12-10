const model = require("../models")
const Location = model.Locations

const getRandomInteger = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
  
    return Math.floor(Math.random() * (max - min)) + min
  }

const getLocations = async ()=>{
    try {
        const findLocations = await Location.findAll();

        if (findLocations.length!=0){
            return findLocations
        }
        return [];
    } catch (error) {
        console.log(error)
        return []
    }
    

}


const getLocationFromId = async (planId)=>{
    try {
        const findLocations = await Location.findOne({where:{id:planId}});

        if (findLocations.length!=0){
            return findLocations
        }
        return [];
    } catch (error) {
        console.log(error)
        return []
    }
    
}

const getRandomLocation = async (planId)=>{
    try {
        const findLocations = await Location.findAll();

        if (findLocations.length!=0){
            let index = getRandomInteger(0,findLocations.length);
            return findLocations[index]
        }
        return null;
    } catch (error) {
        console.log(error)
        return null;
    }
    

}

module.exports = {
    getLocations,
    getLocationFromId,
    getRandomLocation,
}