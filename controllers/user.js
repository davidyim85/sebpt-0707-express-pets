const User = require('../models/user.js');
const express = require('express');
const jwt = require('jsonwebtoken'); //this is the package that sends the jwt token. Keep in mind this json needs a key (in our case)
//JWT_SECRET which will be the string that is needed to create the jwt token or decyper it.
const bcrypt = require('bcrypt');



//declare a variable that says these are routes
const router = express.Router();


// Add in constant for the number of rounds 
const saltRounds = 12;

// a route for signing up
router.post('/sign-up', async (req, res) => {
    try {
        // Check if the username is already taken
        const userInDatabase = await User.findOne({ username: req.body.username });

        if (userInDatabase) {
            return res.status(409).json({ err: 'Username already taken.' });
        }


        // Create a new user with hashed password
        const user = await User.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, saltRounds)
        });

        const token = jwt.sign({ username: user.username, _id: user._id, }, process.env.JWT_SECRET) //all of our tokens need to be signed using the JSW_SECRET string

        res.status(201).json({ token });
    } catch (err) {
        // Set up for catch
        res.status(400).json({ error: error });
    }
});

// a route for signing in
router.post('/sign-in', async (req, res) => {
    try {
        //find the user by username. We know we can because they are unique
        const user = await User.findOne({ username: req.body.username });
        //compare passwords from the request payload to the password in the mongo db
        const doPasswordsMatch = bcrypt.compareSync(req.body.password, user.password);
        //if the user exists and the passwords match
        if (user && doPasswordsMatch) {
            //create a jwt with the username and _id properties and sign it with the JWT_SECRET string
            const token = jwt.sign({ username: user.username, _id: user._id }, process.env.JWT_SECRET);

            //return the user and token
            res.status(201).json({ token });
        } else {
            //return an error saying either the password or username was incorrect
            res.status(400).json({ error: 'Invalid username or password' });
        }

    } catch (err) {
        // Set up for catch
        res.status(400).json({ error: error });
    }
});

//export these routes
module.exports = router;