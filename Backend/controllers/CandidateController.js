const Candidate = require('../models/Candidate'); 

exports.addCandidateController = async (req, res) => { 
    console.log('Add candidate controller invoked');
    

    // Check user is Admin
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Only admins can add candidates.' });
    }

    const { name, age, party, qualification } = req.body;
    console.log(req.body);
    
    if (!name || !age || !party) {
        return res.status(400).json({ message: 'Name, age, and party are required.' });
    }

    try {
        const newCandidate = new Candidate({ 
            name,
            age,
            party,
            qualification,
        });
        const savedCandidate = await newCandidate.save(); 
        return res.status(201).json(savedCandidate);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding candidate', error });
    }
};
