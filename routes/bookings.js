import express from 'express';
const router = express.Router();
import { getAllBookingsById,addBooking,deleteBooking,getAllBookingsOfCustomer,getBookingById } from '../controllers/bookingController.js';

router.get('/:id', getAllBookingsById)
router.post('/addBooking',addBooking)
router.delete('/:id',deleteBooking)
router.get('/customer/:id', getAllBookingsOfCustomer)
router.get('/booking/:id', getBookingById)



export default router;