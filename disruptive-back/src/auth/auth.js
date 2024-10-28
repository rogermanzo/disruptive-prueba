const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
require("dotenv").config();

module.exports = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },
  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },
  generateToken: (user) => {
    const token = jwt.sign({
      id: user._id,
      email: user.email,
      role: user.role,
    }, process.env.JWT_KEY, {
      expiresIn: '2h',
    });
    return token;
  },
  authenticate: async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['Authorization'];
    if (!token) {
      return res.status(401).send({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      //console.log('Decoded token:', decoded);
      req.user = await user.findById(decoded.id);
      next();
    } catch (error) {
      return res.status(401).send({ message: 'Invalid token' });
    }
  },
  authorize: async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['Authorization'];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (decoded.role === 'admin') {
      next();
    } else if (decoded.role === 'lector') {
      if (req.method === 'GET') {
        next();
      } else {
        return res.status(403).send({ message: 'Unauthorized' });
      }
    } else if (decoded.role === 'creador') {
      if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT') {
        next();
      } else {
        return res.status(403).send({ message: 'Forbidden' });
      }
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  },
  onlyAdmin: async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['Authorization'];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (decoded.role === 'admin') {
      next();
    } else {
        return res.status(403).send({ message: 'Unauthorized' });
      }
  },
  returnMe: async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['Authorization'];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = { id: decoded.id };
    return next();
  },
};