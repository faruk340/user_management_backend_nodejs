const mongoose = require("mongoose");
const validator = require("validator");

const registrationdataSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: [true, "Email already present"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email-id")
            }
        }
    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNo: {
        type: Number,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value, {
                minLength: 5,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })) {
                throw new Error("Is Not Strong Password")
            }
        }
    },
    confirmPass: {
        type: String,
        required: true,
        trim: true,
    },
    registrationDate: String,
    finance: Boolean,
    uiinterface: Boolean,
    reportgenet: Boolean,
    productlist: Boolean,
    _type: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
    }
})

const regdata = new mongoose.model("regdata", registrationdataSchema);

module.exports = regdata;