const User = require("../../models/user_model");
const signupValidation = require("../../validation/signupValidation");
const bcrypt = require("bcrypt");


const signup = async (req, res) => {

    try {

        const userData = req.body;

        console.log(userData);

        await signupValidation.validateAsync(userData);

        const { username, email, password } = userData;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All Fields are Required" });
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashpassword
        });

        await newUser.save();

        res.status(200).json({ message: "User Reigistered Successfully", user: newUser });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

module.exports = signup;