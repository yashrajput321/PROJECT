// src/routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const {
  applyForJob,
  getMyApplications,
  getJobApplications,
  deleteApplication,
  updateApplicationStatus
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect); // All routes require authentication

router
  .route('/')
  .post(authorize('jobseeker'), applyForJob);

router.get('/my', getMyApplications);

router.get('/job/:jobId', authorize('employer', 'admin'), getJobApplications);

router
  .route('/:id')
  .delete(deleteApplication);

router.put('/:id/status', authorize('employer', 'admin'), updateApplicationStatus);

module.exports = router;