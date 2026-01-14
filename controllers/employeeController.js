import Employee from "../models/Employees.js";
import Treatment from "../models/Treatments.js";
import mongoose from "mongoose";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getAllEmployees = async (req, res) => {
  try {
    const result = await Employee.find().populate("treatments", "type");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch employees" });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employeeID = req.params.id;
    const result = await Employee.findOne({ _id: employeeID });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch employee" });
  }
};

export const getEmployeeTreatments = async (req,res) =>{
  const employeeId = req.params.id; 
  try{
     const result = await Employee.findById(employeeId).select('treatments').populate("treatments"); 
     res.json(result.treatments)
  }catch(err){
    console.log(err)
    res.status(500).json({error: 'Could not get treatments'})
  }
}

export const addTreatmentToEmployee = async (req, res) => {
  const treatmentId = req.body.treatmentId;
  const employeeId = req.body.employeeId;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({ error: "Invalid employeeId" });
  }

  if (!mongoose.Types.ObjectId.isValid(treatmentId)) {
    return res.status(400).json({ error: "Invalid treatmentId" });
  }
  try {
    const employee = await Employee.findOne({ _id: employeeId });
    if (!employee) {
      return res.status(404).json({ error: "could not find employee" });
    }
    const treatment = await Treatment.findOne({ _id: treatmentId });
    if (!treatment) {
      return res.status(404).json({ error: "could not find treatment" });
    }
    if(!employee.treatments.includes(treatment._id)){
        employee.treatments.push(treatment._id);
        await employee.save();
    res.json(employee);
    }else{
        res.status(409).json({error: 'This treatment already exists on this employee'})
    }
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "could not att treatment" });
  }
};
