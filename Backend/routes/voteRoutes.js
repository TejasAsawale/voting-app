const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

// Get all candidates
router.get('/candidates', voteController.getCandidates);

// Submit a vote
router.post('/vote', voteController.submitVote);

module.exports = router;
