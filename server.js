//all our imports
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const petRouter = require('./controllers/pets.js'); // Import the pets controller file
const cors = require('cors'); //cors 
//end our import code



dotenv.config(); //code that allows environment variables
const app = express(); //the express framework is in the 'app' the variable 


//code to connect to the database //
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})
//end code to connect to the database//


// middleware code //
app.use(cors()); //cors
app.use(express.json()); //this code allows JSON data to be sent
app.use(logger('dev')); //this is the morgan code that logs our requests to the server
//middleware code ends here//

//routes codes go here
app.use('/pets', petRouter); // Add the petRouter to the `/pets` route. This whatever route we define in the pets controller path of /pets in the ENTIRE route
//end of routes code


app.listen(process.env.PORT, () => {
    console.log(`now listening to port: ${process.env.PORT}`)
})
