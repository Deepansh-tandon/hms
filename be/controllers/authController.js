import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Staff from '../models/staff.js';
import Patient from '../models/patient.js';

const ADMIN = {
  username: 'admin',
  password: 'admin123' // In production, move to .env
};

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
console.log('Auth Controller - JWT_SECRET:', JWT_SECRET);

export const login = async (req, res) => {
  try {
    console.log('Login attempt - Request body:', req.body);
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      console.log('Login attempt - Missing required fields');
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    // Admin login
    if (role === 'admin') {
      console.log('Login attempt - Admin login');
      if (email === ADMIN.username && password === ADMIN.password) {
        const token = jwt.sign(
          { role: 'admin' },
          JWT_SECRET,
          { expiresIn: '24h' }
        );
        console.log('Login success - Admin token generated:', token);
        return res.json({ 
          success: true,
          token,
          role: 'admin'
        });
      }
      console.log('Login failed - Invalid admin credentials');
      return res.status(401).json({ 
        success: false,
        error: 'Invalid admin credentials' 
      });
    }

    // Staff login
    if (role === 'staff') {
      console.log('Login attempt - Staff login');
      const staff = await Staff.findOne({ email });
      if (!staff) {
        console.log('Login failed - Staff not found');
        return res.status(401).json({ 
          success: false,
          error: 'Invalid staff credentials' 
        });
      }

      const isPasswordValid = await bcrypt.compare(password, staff.password);
      if (!isPasswordValid) {
        console.log('Login failed - Invalid staff password');
        return res.status(401).json({ 
          success: false,
          error: 'Invalid staff credentials' 
        });
      }

      const token = jwt.sign(
        { 
          id: staff.staff_id,
          role: 'staff'
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      console.log('Login success - Staff token generated:', token);

      return res.json({ 
        success: true,
        token,
        role: 'staff',
        id: staff.staff_id,
        name: staff.name
      });
    }

    // Patient login
    if (role === 'patient') {
      console.log('Login attempt - Patient login');
      const patient = await Patient.findOne({ email });
      if (!patient) {
        console.log('Login failed - Patient not found');
        return res.status(401).json({ 
          success: false,
          error: 'Invalid patient credentials' 
        });
      }

      const isPasswordValid = await bcrypt.compare(password, patient.password);
      if (!isPasswordValid) {
        console.log('Login failed - Invalid patient password');
        return res.status(401).json({ 
          success: false,
          error: 'Invalid patient credentials' 
        });
      }

      const token = jwt.sign(
        { 
          id: patient.patient_id,
          role: 'patient'
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      console.log('Login success - Patient token generated:', token);

      return res.json({ 
        success: true,
        token,
        role: 'patient',
        id: patient.patient_id,
        name: patient.name
      });
    }

    console.log('Login failed - Invalid role specified');
    return res.status(400).json({ 
      success: false,
      error: 'Invalid role specified' 
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    if (!email || !password || !role || !name) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    if (role === 'staff') {
      const existingStaff = await Staff.findOne({ email });
      if (existingStaff) {
        return res.status(400).json({ 
          success: false,
          error: 'Email already registered' 
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const staffId = await Staff.createStaff({ ...req.body, password: hashedPassword });
      
      return res.status(201).json({ 
        success: true,
        id: staffId,
        message: 'Staff registered successfully' 
      });
    } 
    
    if (role === 'patient') {
      const existingPatient = await Patient.findOne({ email });
      if (existingPatient) {
        return res.status(400).json({ 
          success: false,
          error: 'Email already registered' 
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const patientId = await Patient.createPatient({ ...req.body, password: hashedPassword });
      
      return res.status(201).json({ 
        success: true,
        id: patientId,
        message: 'Patient registered successfully' 
      });
    }

    return res.status(400).json({ 
      success: false,
      error: 'Invalid role specified' 
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};

export default {
  login,
  register
}; 