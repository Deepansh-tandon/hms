import prescriptionMedicineModel from '../models/prescription_detail.js'

export const listPrescriptionMedicines = async (req, res) => {
  try {
    const prescriptionMedicines = await prescriptionMedicineModel.getAllPrescriptionMedicines();
    res.json({ 
      success: true,
      data: prescriptionMedicines 
    });
  } catch (error) {
    console.error('Error fetching prescription medicines:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching prescription medicines' 
    });
  }
};

export const getPrescriptionMedicine = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid prescription medicine ID' 
      });
    }

    const prescriptionMedicine = await prescriptionMedicineModel.getPrescriptionMedicineById(id);
    if (!prescriptionMedicine) {
      return res.status(404).json({ 
        success: false,
        error: 'Prescription medicine not found' 
      });
    }

    res.json({ 
      success: true,
      data: prescriptionMedicine 
    });
  } catch (error) {
    console.error('Error fetching prescription medicine:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching prescription medicine' 
    });
  }
};

export const getMedicinesByPrescription = async (req, res) => {
  try {
    const prescriptionId = parseInt(req.params.prescriptionId);
    if (isNaN(prescriptionId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid prescription ID' 
      });
    }

    const medicines = await prescriptionMedicineModel.getMedicinesByPrescription(prescriptionId);
    res.json({ 
      success: true,
      data: medicines 
    });
  } catch (error) {
    console.error('Error fetching prescription medicines:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching prescription medicines' 
    });
  }
};

export const createPrescriptionMedicine = async (req, res) => {
  try {
    const { prescription_id, medicine_id, quantity, dosage } = req.body;

    if (!prescription_id || !medicine_id || !quantity || !dosage) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const prescriptionMedicineId = await prescriptionMedicineModel.createPrescriptionMedicine(req.body);
    res.status(201).json({ 
      success: true,
      id: prescriptionMedicineId,
      message: 'Prescription medicine created successfully' 
    });
  } catch (error) {
    console.error('Error creating prescription medicine:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error creating prescription medicine' 
    });
  }
};

export const updatePrescriptionMedicine = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid prescription medicine ID' 
      });
    }

    const { prescription_id, medicine_id, quantity, dosage } = req.body;
    if (!prescription_id || !medicine_id || !quantity || !dosage) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const result = await prescriptionMedicineModel.updatePrescriptionMedicine(id, req.body);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Prescription medicine not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Prescription medicine updated successfully' 
    });
  } catch (error) {
    console.error('Error updating prescription medicine:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error updating prescription medicine' 
    });
  }
};

export const deletePrescriptionMedicine = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid prescription medicine ID' 
      });
    }

    const result = await prescriptionMedicineModel.deletePrescriptionMedicine(id);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Prescription medicine not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Prescription medicine deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting prescription medicine:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting prescription medicine' 
    });
  }
};

export const getPrescriptionDetails = async (req, res) => {
  try {
    const prescriptionId = parseInt(req.params.prescriptionId);
    if (isNaN(prescriptionId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid prescription ID' 
      });
    }

    const details = await prescriptionMedicineModel.getPrescriptionDetails(prescriptionId);
    res.json({ 
      success: true,
      data: details 
    });
  } catch (error) {
    console.error('Error fetching prescription details:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching prescription details' 
    });
  }
};

export const createPrescriptionDetail = async (req, res) => {
  try {
    const { prescription_id, medicine_id, quantity, dosage } = req.body;

    if (!prescription_id || !medicine_id || !quantity || !dosage) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const detailId = await prescriptionMedicineModel.createPrescriptionDetail(req.body);
    res.status(201).json({ 
      success: true,
      id: detailId,
      message: 'Prescription detail created successfully' 
    });
  } catch (error) {
    console.error('Error creating prescription detail:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error creating prescription detail' 
    });
  }
};

export const updatePrescriptionDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid prescription detail ID' 
      });
    }

    const { prescription_id, medicine_id, quantity, dosage } = req.body;
    if (!prescription_id || !medicine_id || !quantity || !dosage) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const result = await prescriptionMedicineModel.updatePrescriptionDetail(id, req.body);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Prescription detail not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Prescription detail updated successfully' 
    });
  } catch (error) {
    console.error('Error updating prescription detail:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error updating prescription detail' 
    });
  }
};

export const deletePrescriptionDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid prescription detail ID' 
      });
    }

    const result = await prescriptionMedicineModel.deletePrescriptionDetail(id);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Prescription detail not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Prescription detail deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting prescription detail:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting prescription detail' 
    });
  }
};

export default {
  listPrescriptionMedicines,
  getPrescriptionMedicine,
  getMedicinesByPrescription,
  createPrescriptionMedicine,
  updatePrescriptionMedicine,
  deletePrescriptionMedicine,
  getPrescriptionDetails,
  createPrescriptionDetail,
  updatePrescriptionDetail,
  deletePrescriptionDetail
}; 