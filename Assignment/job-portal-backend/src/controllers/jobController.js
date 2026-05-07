// src/controllers/jobController.js
const Job = require('../models/Job');

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res, next) => {
  try {
    const { 
      search, 
      location, 
      employmentType, 
      experienceLevel,
      skills,
      page = 1, 
      limit = 10 
    } = req.query;

    const query = { isActive: true };

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filters
    if (location) {
      query.location = new RegExp(location, 'i');
    }
    if (employmentType) {
      query.employmentType = employmentType;
    }
    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }
    if (skills) {
      const skillsArray = skills.split(',');
      query.skills = { $in: skillsArray };
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .populate('postedBy', 'name email')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit * 1);

    const count = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      count,
      pagination: {
        page: Number(page),
        pages: Math.ceil(count / limit)
      },
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email');

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private (Employer/Admin)
exports.createJob = async (req, res, next) => {
  try {
    req.body.postedBy = req.user.id;

    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Owner/Admin)
exports.updateJob = async (req, res, next) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    // Make sure user is job owner or admin
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to update this job'
      });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Owner/Admin)
exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      });
    }

    // Make sure user is job owner or admin
    if (job.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to delete this job'
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search jobs
// @route   GET /api/jobs/search
// @access  Public
exports.searchJobs = async (req, res, next) => {
  try {
    const { q, ...filters } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a search query'
      });
    }

    const searchQuery = {
      $text: { $search: q },
      isActive: true,
      ...filters
    };

    const jobs = await Job.find(searchQuery)
      .populate('postedBy', 'name email')
      .sort({ score: { $meta: 'textScore' } });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};