import Booking from "../models/Bookings.js";
import mongoose from "mongoose";
import Note from "../models/Notes.js";

export const getAllBookingsById = async (req, res) => {
  const employeeId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json({ error: "Invalid employeeId" });
  }

  try {
    const result = await Booking.find({ employee: employeeId })
      .populate("treatment")
      .populate("customer")
      .populate("employee", "name")
      .populate('note')
      .sort({ bookingEnd: 1 });
    if (result.length == 0) {
      return res.status(500).json({ error: "Could not find bookings" });
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not resolve the booking" });
  }
};

export const getBookingById = async (req,res) => {
  const bookingId = req.params.id; 

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ error: "Invalid bookingId" });
  }

  try{
    const result = await Booking.findById(bookingId)
    .populate("treatment")
      .populate("customer")
      .populate("employee", "name")
      .populate('note')
    return res.json(result); 
  }catch(err){
    console.error(err);
    return res.status(500).json({ error: "Could not find booking" });
  }

}

export const addBooking = async (req, res) => {
  const bookingMade = new Date(req.body.bookingMade);
  const bookingStart = new Date(req.body.bookingStart);
  const bookingEnd = new Date(req.body.bookingEnd);
  const employeeId = req.body.employee;
  const customerId = req.body.customer;
  const treatmentId = req.body.treatment;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.json({ error: "vi inte kunde hitta anställd" });
  }

  if (!mongoose.Types.ObjectId.isValid(treatmentId)) {
    return res.json({ error: "vi inte kunde hitta angiven behandling" });
  }
  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res.json({ error: "vi inte kunde hitta angiven kund" });
  }
  if(bookingStart >= bookingEnd){
    return res.json({error:'du måste välja en tid'})
  }

 
  const timeConflict = await Booking.findOne({
    bookingStart: {
      $lt: bookingEnd,
    },
    bookingEnd: {
      $gt: bookingStart,
    },
  });
  if (timeConflict) {
    return res.json({ error: "det redan finns en bokning vid det valda tillfället" });
  } 

  const addNote = await Note.find({customer:customerId,reminder:true});

  
 if(addNote.length > 0){
  const noteArray = [];
  addNote.forEach(n => {
    noteArray.push(n._id);
  });
     const booking = new Booking({
    _id: new mongoose.Types.ObjectId(),
    bookingMade: bookingMade,
    treatment: treatmentId,
    bookingEnd: bookingEnd,
    bookingStart: bookingStart,
    customer: customerId,
    employee: employeeId,
    note:noteArray,
  });
  
  await booking.save();
  const uppdateNotes = await Note.updateMany({reminder:'true'},
    {$set:{'reminder':'false'}}
  )
    return res.json(booking)

  }else{
    const booking = new Booking({
    _id: new mongoose.Types.ObjectId(),
    bookingMade: bookingMade,
    treatment: treatmentId,
    bookingEnd: bookingEnd,
    bookingStart: bookingStart,
    customer: customerId,
    employee: employeeId,
  });
  await booking.save();
    return res.json(booking)
  }
  

  
};

export const deleteBooking = async (req,res) => {
  const bookingId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    return res.status(400).json({ error: "Invalid bookingId" });
  }

  try{
    const result = await Booking.findByIdAndDelete({_id:bookingId})
      .populate("treatment")
      .populate("customer")
      .populate("employee", "name");
    if (!result) {
      return res.status(500).json({ error: "Kunde inte hitta eller radera bokning" });
    }
    return res.json(result);
  }catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not resolve the booking" });
  }
}

export const getAllBookingsOfCustomer = async (req,res) => {
  const customerId = req.params.id; 

  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res.status(400).json({ error: "Invalid employeeId" });
  }

  try{
    const result = await Booking.find({customer:customerId})
      .populate("treatment")
      .populate("customer")
      .populate("employee", "name")
      .populate('note')
      .sort({ bookingEnd: -1 });
    if (result.length == 0) {
      return res.status(500).json({ error: "Kund har inga bokningar" });
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Could not resolve the booking" });
  }
  
}
