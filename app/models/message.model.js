const mongoose = require("mongoose");
const User = require("./user.model");

const messageSchema = mongoose.messageSchema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User,
            required: true
        }
    },
    {
        timestamps: true
    }
);
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;