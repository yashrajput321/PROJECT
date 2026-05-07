// src/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  searchJobs
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.get('/search', searchJobs);

router
  .route('/')
  .get(getJobs)
  .post(protect, authorize('employer', 'admin'), createJob);

router
  .route('/:id')
  .get(getJob)
  .put(protect, authorize('employer', 'admin'), updateJob)
  .delete(protect, authorize('employer', 'admin'), deleteJob);

module.exports = router;