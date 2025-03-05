const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');


module.exports.registerCaptain = async (req, res) => {

        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { firstname, email, password, vehicleType } = req.body;

        const isCaptainAlreadyExist = await captainModel.findOne({ email });

        if (isCaptainAlreadyExist) {
            return res.status(400).json({ error: 'Captain already exists' });
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
          fistname: fullname.firstname,
          lastname: fullname.lastname,
          email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateToken();

        res.status(201).json({ captain, token });

}