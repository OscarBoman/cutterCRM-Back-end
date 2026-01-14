import { Schema,model } from "mongoose";

const employeeSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        name: {
            type: String,
            required: true,  
        },
        treatments: [{
    type: Schema.Types.ObjectId,
    ref: "Treatment"
  }]
    },{
    versionKey: false
  }
)

const Employee = model('Employee',employeeSchema);
export default Employee;