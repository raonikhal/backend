const User = require("../../models/user_model");
const loginValidation = require("../../validation/loginValidation");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config();

const login = async (req, res) => {
    try {
        const userData = req.body;
        await loginValidation.validateAsync(userData);

        const { email, password } = userData;

        const user = await User.findOne({ email: email });

        console.log(user);

        if (!user) {
            res.status(400).json({ message: "User Not Found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid Credentials" });
        }

        const userDetails = {
            userId: user._id,
            emailId: user.email
        };

        const token = JWT.sign(
            userDetails,
            process.env.JWT_USER_TOKEN,
            { expiresIn: "1h" }
        );

        res.cookie("usertoken", token, { httpOnly: true, secure: false, sameSite: "lax" });


        res.status(200).json({ message: "Login Successful ", user: user, Token: token })

    } catch (err) {
        res.status(400).json({ message: "Error in Login ", error: err });
    }
};

module.exports = login;