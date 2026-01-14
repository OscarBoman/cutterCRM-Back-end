import Treatment from "../models/Treatments.js";
import mongoose from "mongoose";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getAllTreatments = async (req,res) => {
    try{
        const result = await Treatment.find(); 
        return res.json(result)
    }
    catch{
         return res.status(404).json({})
    }
}

export const addTreatment = async (req,res) => {
    const treatmentType = req.body.type.toLowerCase();
    const c = capitalizeFirstLetter(treatmentType)
    const treatmentPrice = req.body.price;
    const treatmentTime = req.body.time; 
    try{
        const newTreatment = new Treatment({
             _id: new mongoose.Types.ObjectId(),
             type: c,
             price: treatmentPrice,
             time: treatmentTime

        })
        const exists = await Treatment.findOne({type:c})
        if(!exists){
            await newTreatment.save(); 
            res.json(newTreatment)
        }else{
            res.json({error: 'treatment already exists'})
        }
    }catch(err){
        console.error(err)
        res.status(500).json({error: "can't add treatment"})
    }
}

export const getTreatmentById = async (req,res) => {
    const id = req.params.id; 
    const result = await Treatment.find({})
}