const Pet = require('../models/pets.js');
const express = require('express');

//declare a variable that says these are routes
const router = express.Router();


//Write the controllers routes code here

//route to add pets data to the db
router.post('/', async (req, res) => {
    try {
        const createdPets = await Pet.create(req.body);
        res.status(201).json(createdPets);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

//route to fetch all pets data from the db
router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find();
        res.status(200).json(foundPets);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});


//route to fetch a single pets data from the db using the id of the pet
router.get('/:petId', async (req, res) => {
    try {
        // Add query to find a single pet
        const foundPet = await Pet.findById(req.params.petId);
        // Add error handling if a pet is not found
        if (!foundPet) {
            res.status(404);
            throw new Error('Pet not found.');
        }

        res.status(200).json(foundPet);
    } catch (err) {
        console.log(err)
        if (res.status === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

//route to delete a single pets data from the db using the id of the pet
router.delete('/:petId', async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.petId);
        res.status(200).json(deletedPet);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

//route to update a single pets data from the db using the id of the pet
router.put('/:petId', async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body);
        res.status(200).json(updatedPet);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});
//end of the controller routes code 

module.exports = router;
