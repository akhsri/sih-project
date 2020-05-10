const Channel = require("../models/channel.model");

module.exports.create = (req, res) => {
    var channel = new Channel();

    channel.participants = req.body.participants;

    channel
        .save()
        .then(channel => {
            res.status(200);
            res.json({
                channel: channel
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}



// Deleting a channel
exports.delete = (req, res) => {
    Channel.findByIdAndRemove(req.params.channelId)
        .then(channel => {
            if (!channel) {
                return res.status(404).send({
                    message: "Channel not found with Id " + req.params.channelId
                })
            }
            res.send({
                message: "Channel deleted successfully"
            })
        })
        .catch(error => {
            if (error.kind === "ObjectId" || error.name === "NotFound") {
                return res.status(404).send({
                    message: "Channel not found with Id " + req.params.channelId

                })
            }
            return res.status(500).send({
                message: "Could not delete channel with Id " + req.params.channelId
            })
        })
}