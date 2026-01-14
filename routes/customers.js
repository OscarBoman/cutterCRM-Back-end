import express from 'express';
const router = express.Router();
import { getAllCustomers,getCustomersOfEmployee,addCustomer,getCustomerById } from '../controllers/customerController.js';

router.get('/',getAllCustomers)
router.get('/:id',getCustomerById);
router.get('/employee/:id',getCustomersOfEmployee);
router.post('/addCustomer',addCustomer);

export default router;