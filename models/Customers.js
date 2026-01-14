import { Schema, model } from "mongoose";


const customerSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    minlength: [5],
  },
  email:{
    type: String,
    required: true,
    minlength: [5],
  },
  gender:{
    type: String,
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee', 
    required: true,
  },
  
},{
    versionKey: false
  });

const Customer = model("Customer", customerSchema);
export default Customer;
