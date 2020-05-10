const mongoose = require("mongoose");
const User = require("./user.model");

const fundRequestSchema = mongoose.Schema({
    requestTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    requestFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    schemeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scheme",
        required: true
    },
    requestState: {
        type: String,
        enum: ["Pending", "Approved", "Denied"],
        default: "Pending"
    }
}, {
        timestamps: true
    })

const fundRequest = mongoose.model("fundRequest", fundRequestSchema);
module.exports = fundRequest;