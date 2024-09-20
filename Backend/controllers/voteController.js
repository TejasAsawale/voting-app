const Vote = require('../models/Vote');

// Get all candidates
exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Vote.find();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching candidates', error });
    }
    };

    // submit the vote
    exports.submitVote = async (req, res) => {
    const { candidateId } = req.body;
    
    try {
        const vote = await Vote.findById(candidateId);
        
        if (!vote) {
        return res.status(404).json({ message: 'Candidate not found' });
        }

        vote.voterSelection = true;  
        await vote.save();

        res.status(200).json({ message: 'Vote submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting vote', error });
    }
};
