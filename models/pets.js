///////////////////////////////////////////////
//////// Pets model                   ///////// 
///////////////////////////////////////////////
const mongoose = require('mongoose');

const PetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    breed: String,
    age: {
        type: Number,
        required: true,
        min: 0,
    },
});

// create a variable that creates a models from the schema variable 'PetSchema'. 
// This variable will be the 'thing' that is used to define our records in the collection
const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;