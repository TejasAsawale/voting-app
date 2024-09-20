const Election = require('../models/Election');

// Create new election
exports.createElection = async (req, res) => {
    console.log("Create election controller invoked"); 

    if (!req.user || req.user.role !== 'admin') {
        console.log("Access denied: User is not admin."); 
        return res.status(403).json({ message: 'Forbidden: Only admins can create elections.' });
    }

    const { title, electionDate } = req.body;
    console.log('Request Body:', req.body); 

    if (!title || !electionDate) {
        console.log("Validation error: Title or election date missing."); 
        return res.status(400).json({ message: 'Title and election date are required' });
    }

    try {
        console.log("Processing election..."); 
        const isComing = new Date(electionDate) >= new Date();

        const election = new Election({
            title,
            electionDate,
            isComing
        });

        await election.save();
        console.log("Election saved successfully."); 

        res.status(201).json({ message: 'Election created successfully', election });
    } catch (error) {
        console.error('Error during election creation:', error); 
        res.status(500).json({ message: 'Failed to create election', error: error.message });
    }
};

// Get upcoming elections
exports.getUpcomingElections = async (req, res) => {
    try {
        const upcomingElections = await Election.find({ isComing: true }).sort({ electionDate: 1 });
        res.json(upcomingElections);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch upcoming elections', error: error.message });
    }
};

// Get other elections
exports.getOtherElections = async (req, res) => {
    try {
        const otherElections = await Election.find({ isComing: false }).sort({ electionDate: 1 });
        res.json(otherElections);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch other elections', error: error.message });
    }
};
