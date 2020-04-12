const mongoose = require("mongoose");

const schemeSchema = mongoose.Schema({
    schemeName: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    }
}, {
        timestamps: true
    })

const Scheme = mongoose.model("Scheme", schemeSchema);
module.exports = Scheme;