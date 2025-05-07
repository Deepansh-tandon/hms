import express from 'express';
import prescriptionMedicineController from '../controllers/prescriptionMedicineController.js';

const router = express.Router();

// Get all prescription medicines
router.get('/', prescriptionMedicineController.listPrescriptionMedicines);

// Get a single prescription medicine
router.get('/:id', prescriptionMedicineController.getPrescriptionMedicine);

// Get medicines by prescription
router.get('/prescription/:prescriptionId', prescriptionMedicineController.getMedicinesByPrescription);

// Create a new prescription medicine
router.post('/', prescriptionMedicineController.createPrescriptionMedicine);

// Update a prescription medicine
router.put('/:id', prescriptionMedicineController.updatePrescriptionMedicine);

// Delete a prescription medicine
router.delete('/:id', prescriptionMedicineController.deletePrescriptionMedicine);

export default router; 