import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
    _id: Schema.Types.ObjectId,
    bookingEnd: {
        required: true,
        type: Date,
    },
    bookingStart: {
        required: true,
        type: Date,
    },
    bookingMade: {
        required:true,
        type:Date,
    },
    treatment:{
         type: Schema.Types.ObjectId,
         required: true,
         ref:'Treatment'
    },
    employee: {
        type: Schema.Types.ObjectId,
         required: true,
         ref:'Employee'
    },
    customer: {
        type: Schema.Types.ObjectId,
         required: true,
         ref:'Customer'
    },
    note:[{
        type:Schema.Types.ObjectId,
        required: false,
        ref:'Note'
    }]
},{
    versionKey: false
  })

  const Booking = model("Booking", bookingSchema);
  export default Booking;
