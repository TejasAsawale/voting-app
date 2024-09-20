const express = require('express');
const { registerUser, loginUser, getUserInfo} = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// only authenticated user (admin/user)
router.get('/getUserInfo',authMiddleware(), getUserInfo);

router.get('/adminDashboard',authMiddleware(['admin']), (req, res) => {
    res.json({ message: 'Welcome Admin!'});
});

module.exports = router;