const bcrypt = require("bcrypt");
const Admin = require("../../models/admin_model");

const adminSignup = async (req, res) => {
    try{

        console.log(req.body)
        const adminData = req.body;

        console.log("last", adminData);

        const {adminName, email, password} = adminData;

        if(!adminName || !email || !password){
            return res.status(400).json({message : "All fields are required"});
        }

        const adminExists = await Admin.findOne({email : email});

        if(adminExists){
            return res.status(409).json({message : "Admin already exists"});   
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            adminName,
            email,
            password : hashPassword
        });

        await newAdmin.save();

        res.status(201).json({message : "Admin registered successfully", admin : newAdmin});

    }catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }  
}

module.exports = adminSignup;