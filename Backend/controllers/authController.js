const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({storage: storage});

exports.registerUser = async(req, res) => {
    const {name, DOB, GuardianName, email, mobileNumber, password, reEnteredPassword, aadharNumber, role} = req.body;
    // console.log(req.body);

    if (password !== reEnteredPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }    

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User ({
            name, 
            DOB,
            GuardianName,
            email,
            mobileNumber,
            password: hashedPassword,
            aadharNumber,
            role
        });

        await newUser.save();
        res.status(201).json({ message: 'Registered Successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message})
    }
};

// login in a user 
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ 
            token,
            role: user.role
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

// Get user profile
exports.getUserInfo = async (req, res) => {
    try {
        // Retrieve user ID from the authenticated request (decoded by authMiddleware)
        const userId = req.user.id;

        // Query the database to get user info by ID, excluding the password field
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the user data
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
