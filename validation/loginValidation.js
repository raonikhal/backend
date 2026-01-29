const JOI = require("joi");

const loginValidation = JOI.object({
    email : JOI.string().min(3).max(50).required(),
    password : JOI.string().min(6).max(20).required(),
});

module.exports = loginValidation;