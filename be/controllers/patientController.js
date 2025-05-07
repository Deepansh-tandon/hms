import Patient from '../models/patient.js'

const listPatients = async (req, res) => {
  try {
    const patients = await Patient.getAllpatient();
    res.json({ success: true, data: patients });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ success: false, error: 'Error fetching patients' });
  }
};

const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.getPatientById(id);
    
    if (!patient) {
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }

    // // If the request is from a patient, only allow access to their own data
    // if (req.user.role === 'patient' && req.user.id !== parseInt(id)) {
    //   return res.status(403).json({ success: false, error: 'Access denied' });
    // }

    res.json({ success: true, data: patient });
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ success: false, error: 'Error fetching patient' });
  }
};

const registerPatient = async (req, res) => {
  try {
    const { first_name, last_name, date_of_birth, gender, email, password, phone, address,emergency_contact } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !date_of_birth || !gender || !email || !password||!emergency_contact) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Check if email already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    const patientId = await Patient.createPatient({
      first_name,
      last_name,
      date_of_birth,
      gender,
      email,
      password,
      phone,
      address
    });

    res.status(201).json({ 
      success: true, 
      message: 'Patient registered successfully',
      data: { id: patientId }
    });
  } catch (error) {
    console.error('Error registering patient:', error);
    res.status(500).json({ success: false, error: 'Error registering patient' });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If the request is from a patient, only allow updates to their own data
    if (req.user.role === 'patient' && req.user.id !== parseInt(id)) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    await Patient.updatePatient(id, updates);
    res.json({ success: true, message: 'Patient updated successfully' });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ success: false, error: 'Error updating patient' });
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    // Only admin can delete patients
    if (req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    await Patient.deletePatient(id);
    res.json({ success: true, message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ success: false, error: 'Error deleting patient' });
  }
};

export {
  listPatients,
  getPatient,
  registerPatient,
  updatePatient,
  deletePatient
}; 