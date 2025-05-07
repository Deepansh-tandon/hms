import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  console.log('Auth Middleware - Request Headers:', req.headers);
  const authHeader = req.headers.authorization;
  console.log('Auth Middleware - Authorization Header:', authHeader);
  
  if (!authHeader) {
    console.log('Auth Middleware - No Authorization header found');
    return res.status(401).json({ 
      success: false,
      error: 'No token provided' 
    });
  }

  const token = authHeader.split(' ')[1];
  console.log('Auth Middleware - Extracted Token:', token);
  console.log('Auth Middleware - JWT_SECRET:', process.env.JWT_SECRET);

  if (!token) {
    console.log('Auth Middleware - No token found in Authorization header');
    return res.status(401).json({ 
      success: false,
      error: 'No token provided' 
    });
  }

  try {
    console.log('Auth Middleware - Attempting to verify token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth Middleware - Token successfully decoded:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth Middleware - Token verification failed:', err);
    return res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false,
      error: 'Admin access required' 
    });
  }
  next();
};

const staffOnly = (req, res, next) => {
  if (req.user.role !== 'staff') {
    return res.status(403).json({ 
      success: false,
      error: 'Staff access required' 
    });
  }
  next();
};

const patientOnly = (req, res, next) => {
  if (req.user.role !== 'patient') {
    return res.status(403).json({ 
      success: false,
      error: 'Patient access required' 
    });
  }
  next();
};

export { verifyToken, adminOnly, staffOnly, patientOnly }; 