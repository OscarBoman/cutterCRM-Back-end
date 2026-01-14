import express from 'express';
const router = express.Router();
import { getAllTreatments,addTreatment } from '../controllers/treatmentController.js';

router.get('/',getAllTreatments)
router.post('/add',addTreatment)

export default router;