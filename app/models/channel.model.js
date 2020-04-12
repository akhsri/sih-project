const mongoose = require("mongoose");

const channelSchema = mongoose.Schema({
    participants: {
        type: Array,
        required: true
    }
},
    {
        timestamps: true
    }
);

const Channel = mongoose.model("Channel", channelSchema);
module.exports = Channel;