const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    DOB: { type: Date, required: true },
    GuardianName: { type: String },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true },
    aadharNumber: { type: String, required: true, unique: true },
    role: {
        type: String, enum: ['user','admin'], default: 'user'
    }
});

module.exports = mongoose.model('User',UserSchema);