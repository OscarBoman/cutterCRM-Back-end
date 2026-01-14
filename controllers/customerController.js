import Customer from "../models/Customers.js";
import mongoose from "mongoose";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const getAllCustomers = async (req,res) => {
    try{
        res.json(await Customer.find().populate('employee','name'));
    }
    catch(err){
       console.error(err);
       res.status(500).json({ error: "Could not fetch customers" });
    }
}

export const getCustomerById = async (req,res) => {
    const id = req.params.id; 
    try{
        res.json(await Customer.findOne({_id:id}).populate('employee', 'name'));
    }catch(err){
        console.error(err);
       res.status(500).json({ error: "Could not fetch customer" });
    }
}


export const getCustomersOfEmployee = async (req,res) => {
    try{
        const employee = req.params.id;  
        const customers = await Customer.find({employee:employee}).populate('employee', 'name');
        if(customers.length === 0){
            res.status(404).json({error:'This employee dont exist'})
        }else{
            res.send(customers)
        }
    }catch(err){
        console.error(err); 
        res.status(500).json({error: 'Could not find customers'})
    }
}

export const addCustomer = async (req,res) => {
    const employeeId = req.body.employeeId; 
    const customerFirstName = req.body.customerFirstName.toLowerCase();
    const customerLastName = req.body.customerLastName.toLowerCase();
    const c = capitalizeFirstLetter(customerFirstName);
    const b =  capitalizeFirstLetter(customerLastName);
    const customerName = c + ' ' + b;
    const customerEmail = req.body.customerEmail.toLowerCase();
    const customerGender = req.body.customerGender; 
    
    if(customerName.length < 5){
        return res.json({error: 'Name to short'})
    }
    if(customerGender == ''){
        return res.json({error: 'Must choose gender'})
    }
    try{
        const customer = new Customer ({
            _id: new mongoose.Types.ObjectId(),
            name: customerName,
            email: customerEmail,
            gender: customerGender,
            employee: employeeId,
        }); 
        const exists = await Customer.findOne({email: customerEmail}); 
        if(exists){
            return res.json({error:'Denna email existerar redan'})
        }else{
            await customer.save()
            res.json(customer)
        }   
    }catch(err){
        console.error(err); 
        res.status(500).json({error: 'did not work'})
    }
}
