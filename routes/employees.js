import express from 'express';
const router = express.Router();
import { getAllEmployees,getEmployeeById,addTreatmentToEmployee,getEmployeeTreatments } from '../controllers/employeeController.js';

router.get('/',getAllEmployees)
router.get('/:id',getEmployeeById)
router.get('/treatments/:id',getEmployeeTreatments)
router.post('/addTreatment',addTreatmentToEmployee)

export default router;