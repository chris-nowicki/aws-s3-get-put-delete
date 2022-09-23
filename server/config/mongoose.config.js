const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

// connect to MongoDB and creates database if it doesn't already exist
mongoose.connect( url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));