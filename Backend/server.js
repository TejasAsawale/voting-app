const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 
const userRoutes = require('./routes/userRoutes'); 
const electionRoutes = require('./routes/electionRoutes'); 
const voteRoutes = require('./routes/voteRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware for JSON body parsing
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

app.use('/api/user', userRoutes); 
app.use('/api/elections', electionRoutes); 
app.use('/api/vote', voteRoutes);
app.use('/api/candidate',candidateRoutes);


// Set the port from environment or default 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
