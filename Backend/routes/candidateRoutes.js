const express = require('express');
const {addCandidateController} = require('../controllers/CandidateController'); 
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// add new candidate (only admin)
router.post('/add-candidate', authMiddleware(), addCandidateController);

module.exports = router;
