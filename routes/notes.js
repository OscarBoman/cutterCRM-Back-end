import express from 'express';
const router = express.Router();
import { getNotesWithId,addNote } from '../controllers/noteController.js';

router.get('/:id', getNotesWithId)
router.post('/addNote',addNote)
//router.delete('/:id',deleteBooking)
//router.get('/customer/:id', getAllBookingsOfCustomer)



export default router;