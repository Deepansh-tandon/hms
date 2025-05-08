import prescriptionModel from '../models/prescription.js'

export const listPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prescriptionModel.getAllPrescriptions();
    res.json({ 
      success: true,
      data: prescriptions 
    });
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching prescriptions' 
    });
  }
};

export const getPrescription = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid prescription ID' 
      });
    }

    const prescription = await prescriptionModel.getPrescriptionById(id);
    if (!prescription) {
      return res.status(404).json({ 
        success: false,
        error: 'Prescription not found' 
      });
    }

    res.json({ 
      success: true,
      data: prescription 
    });
  } catch (error) {
    console.error('Error fetching prescription:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching prescription' 
    });
  }
};

export const getAppointmentPrescriptions = async (req, res) => {
  try {
    const appointmentId = parseInt(req.params.appointmentId);
    if (isNaN(appointmentId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid appointment ID' 
      });
    }

    const prescriptions = await prescriptionModel.getPrescriptionsByAppointment(appointmentId);
    res.json({ 
      success: true,
      data: prescriptions 
    });
  } catch (error) {
    console.error('Error fetching appointment prescriptions:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching appointment prescriptions' 
    });
  }
};

export const getStaffPrescriptions = async (req, res) => {
  try {
    const staffId = parseInt(req.params.staffId);
    if (isNaN(staffId)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid staff ID' 
      });
    }

    const prescriptions = await prescriptionModel.getPrescriptionsByStaff(staffId);
    res.json({ 
      success: true,
      data: prescriptions 
    });
  } catch (error) {
    console.error('Error fetching staff prescriptions:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching staff prescriptions' 
    });
  }
};

export const createPrescription = async (req, res) => {
  try {
    const { appointment_id, staff_id, issue_date, notes } = req.body;

    if (!appointment_id || !staff_id || !issue_date) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const prescriptionId = await prescriptionModel.createPrescription(req.body);
    res.status(201).json({ 
      success: true,
      id: prescriptionId,
      message: 'Prescription created successfully' 
    });
  } catch (error) {
    console.error('Error creating prescription:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error creating prescription' 
    });
  }
};

export const updatePrescription = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid prescription ID' 
      });
    }

    const { appointment_id, staff_id, issue_date } = req.body;
    if (!appointment_id || !staff_id || !issue_date) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const result = await prescriptionModel.updatePrescription(id, req.body);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Prescription not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Prescription updated successfully' 
    });
  } catch (error) {
    console.error('Error updating prescription:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error updating prescription' 
    });
  }
};
 
export const deletePrescription = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid prescription ID' 
      });
    }

    const result = await prescriptionModel.deletePrescription(id);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Prescription not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Prescription deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting prescription:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting prescription' 
    });
  }
};

export default {
  listPrescriptions,
  getPrescription,
  getAppointmentPrescriptions,
  getStaffPrescriptions,
  createPrescription,
  updatePrescription,
  deletePrescription
}; 