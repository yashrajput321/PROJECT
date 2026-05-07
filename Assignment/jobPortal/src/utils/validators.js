// src/utils/validators.js
const { body, validationResult } = require('express-validator');

// Validation rules
exports.validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['jobseeker', 'employer']).withMessage('Invalid role')
];

exports.validateJob = [
  body('title').notEmpty().withMessage('Job title is required'),
  body('company').notEmpty().withMessage('Company name is required'),
  body('description').notEmpty().withMessage('Job description is required'),
  body('location').notEmpty().withMessage('Job location is required')
];

exports.validateApplication = [
  body('jobId').isMongoId().withMessage('Invalid job ID'),
  body('coverLetter').optional().isLength({ max: 1000 }).withMessage('Cover letter too long')
];

// Validation middleware
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};