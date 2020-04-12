const mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
const Department = require("./department.model");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    officialOf: {
        type: String,
        required: true,
        trim: true
    },
    government: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Department,
        trim: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },

    hash: String,
    salt: String


}, {
        timestamps: true
    });

userSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
};

userSchema.methods.validPassword = (password) => {
    var hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
    return this.hash === hash;
}

userSchema.methods.generateJwt = () => {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        officialOf: this.officialOf,
        government: this.government,
        department: this.department,
        role: this.role,
        exp: parseInt(expiry.getTime() / 1000)


    }, "MY_SECRET");
};

const User = mongoose.model("User", userSchema);
module.exports = User;   