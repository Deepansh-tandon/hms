import hospitalModel from '../models/hospital.js'

// Get all hospitals
export const listHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalModel.getAllHospitals();
    res.json({ 
      success: true,
      data: hospitals 
    });
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching hospitals' 
    });
  }
};

// Get a single hospital by ID
export const getHospital = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid hospital ID' 
      });
    }

    const hospital = await hospitalModel.getHospitalById(id);
    if (!hospital) {
      return res.status(404).json({ 
        success: false,
        error: 'Hospital not found' 
      });
    }

    res.json({ 
      success: true,
      data: hospital 
    });
  } catch (error) {
    console.error('Error fetching hospital:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error fetching hospital' 
    });
  }
};

// Create a new hospital
export const createHospital = async (req, res) => {
  try {
    const { name, address, phone } = req.body;

    if (!name || !address || !phone) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const hospitalId = await hospitalModel.createHospital(req.body);
    res.status(201).json({ 
      success: true,
      id: hospitalId,
      message: 'Hospital created successfully' 
    });
  } catch (error) {
    console.error('Error creating hospital:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error creating hospital' 
    });
  }
};

// Update an existing hospital
export const updateHospital = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid hospital ID' 
      });
    }

    const { name, address, phone } = req.body;
    if (!name || !address || !phone) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const result = await hospitalModel.updateHospital(id, req.body);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Hospital not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Hospital updated successfully' 
    });
  } catch (error) {
    console.error('Error updating hospital:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error updating hospital' 
    });
  }
};

// Delete a hospital
export const deleteHospital = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid hospital ID' 
      });
    }

    const result = await hospitalModel.deleteHospital(id);
    if (!result) {
      return res.status(404).json({ 
        success: false,
        error: 'Hospital not found' 
      });
    }

    res.json({ 
      success: true,
      message: 'Hospital deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting hospital:', error);
    res.status(500).json({ 
      success: false,
      error: 'Error deleting hospital' 
    });
  }
};

export default {
  listHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital
};