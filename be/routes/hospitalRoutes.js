import express from 'express';
import hospitalController from '../controllers/hospitalController.js';

const router = express.Router();

// Get all hospitals
router.get('/hospital/', hospitalController.listHospitals);

// Get a single hospital
router.get('/hospital/:id', hospitalController.getHospital);

// Create a new hospital
router.post('/hospital/', hospitalController.createHospital);

// Update a hospital
router.put('/hospital/:id', hospitalController.updateHospital);

// Delete a hospital
router.delete('/hospital/:id', hospitalController.deleteHospital);

export default router; 