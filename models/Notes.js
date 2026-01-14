import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    _id: Schema.Types.ObjectId,

  note:{
    type: String,
    required: true,
  },
  date:{
    type:Date,
    required:true,

  },
  customer:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'Customer'
  },
  reminder: {
    type: Boolean,
    required: true,
  }
},{
    versionKey: false
  });

const Note = model("Note", noteSchema);
export default Note;
