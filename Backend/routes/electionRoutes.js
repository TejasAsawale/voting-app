const express = require('express');
const {createElection, getUpcomingElections, getOtherElections} = require('../controllers/ElectionController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// create a new election (admin only)
router.post('/create-elections',authMiddleware(), createElection);

// getting elections (both admin/user)
router.get('/upcoming-elections',authMiddleware(), getUpcomingElections);
router.get('/other-elections',authMiddleware(), getOtherElections);

module.exports = router;