const JOI = require("joi");

const signupValidation = JOI.object({
    username : JOI.string().min(3).max(20).required(),
    email : JOI.string().email().required(),
    password : JOI.string().min(6).max(50).required(),
});

module.exports = signupValidation;