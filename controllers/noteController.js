import Note from "../models/Notes.js";
import mongoose from "mongoose";

export const getNotesWithId = async (req,res) => {
    const id = req.params.id; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid note id" });
      }

    try{
        const result = await Note.find({customer:id}).sort({ date: -1 });;
        return res.json(result)
    }catch(err){
        console.error(err);
       return res.status(500).json({ error: "Could not fetch note" });
    }
}

export const addNote = async (req,res) => {
    const note = req.body.note;
    const reminder = req.body.reminder;
    const customerId = req.body.customerId;
    const date = new Date(); 
    const isoDate = date.toISOString(); 
    console.log(note)
    try{
        const newNote = new Note({
            _id: new mongoose.Types.ObjectId(),
            note:note,
            reminder:reminder,
            customer:customerId,
            date:isoDate
        });
        await newNote.save();
        return res.json(newNote)
    }catch(err){
        console.error(err);
       return res.status(500).json({ error: "Could not create note" });
    }
}
