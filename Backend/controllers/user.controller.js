exports.registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

      
        const hashedPassword = await userModel.hashPassword(password);

        const newUser = new userModel({
            fullname,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
