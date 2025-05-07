import express from 'express';
import medicineController from '../controllers/medicineController.js';

const router = express.Router();

// Get all medicines
router.get('/medicine/', medicineController.listMedicines);

// Get a single medicine
router.get('/medicine/:id', medicineController.getMedicine);

// Create a new medicine
router.post('/medicine/', medicineController.createMedicine);
router.get('/medicine/alert/low-stock-alerts', medicineController.listLowStockAlerts); 

// Update a medicine
router.put('/medicine/:id', medicineController.updateMedicine);

// Delete a medicine
router.delete('/medicine/:id', medicineController.deleteMedicine);

export default router; 