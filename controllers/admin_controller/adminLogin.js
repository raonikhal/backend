const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../../models/admin_model");

dotenv.config();

const adminLogin = async (req, res) => {
    try {
        const adminData = req.body;
        
        const { email, password } = adminData;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const admin = await Admin.findOne({ email: email });


        if (!admin) {
            return res.status(404).json({ message: "admin not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //jwt token

        const adminDetails = {
            adminID: admin._id,
            email: admin.email
        }

        const token = jwt.sign(
            adminDetails,
            process.env.JWT_ADMIN_TOKEN,
            { expiresIn: "1h" }
        )

        res.cookie("admintoken", token, {
            httpOnly: true,
            secure: false, // Use secure cookies in production
            sameSite: "lax", // Adjust as necessary
            path : "/"
        });

        res.status(200).json({ message: "Login successful", admin: admin , token: token });

    } catch (err) {
        res.status(500).json({ message: err.message || "Server error" });
    }
};

module.exports = adminLogin;