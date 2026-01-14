import { Schema, model } from "mongoose";

const treatmentSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  }
},{
    versionKey: false
  });

const Treatment = model("Treatment", treatmentSchema);
export default Treatment;
