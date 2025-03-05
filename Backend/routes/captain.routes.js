const captainController = require('../controllers/captain.controller');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();


router.post('/register', [
        body(email).isEmail().withMessage('Invalid email format'),
        body(password).isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body(fullname.firstname).isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
        body(vehicle.color).isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
        body(vehicle.plate).isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
        body(vehicle.capacity).isNumeric().withMessage('Capacity must be a number'),
        body(vehicle.vehicleType).isIn(['car', 'van', 'bus']).withMessage('Invalid vehicle type'),
    ],
       captainController.registerCaptain
);

module.exports = router;