const Message = require("../models/message.model");

module.exports.create = (req, res) => {
    var message = new Message();

    message.sender = req.body.sender;
    message.text = req.body.text;
    message.channel = req.body.channel;
    message
        .save()
        .then(message => {
            res.status(200);
            res.json({
                message: message
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

// Get all messages by channel Id
exports.find = (req, res) => {
    Message.find({
        channel: req.query.channel
    })
        .then(messages => {
            //console.log("req.messages", req.messages);
            if (!messages) {
                return res.status(404).send({
                    message: "message not found with id " + req.query.channel
                })
            }
            console.log("messages: ", messages);

            res.send(messages.reverse());
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Message not found with id " + req.query.channel
                });
            }
            console.log("error: ", err);
            return res.status(500).send({
                message: "Error retreiving message with id " + req.query.channel
            });
        });
}


// Deleting a message
exports.delete = (req, res) => {
    Message.findByIdAndRemove(req.params.messageId)
        .then(message => {
            if (!message) {
                return res.status(404).send({
                    message: "Message not found with Id " + req.params.messageId
                })
            }
            res.send({
                message: "Message deleted successfully"
            })
        })
        .catch(error => {
            if (error.kind === "ObjectId" || error.name === "NotFound") {
                return res.status(404).send({
                    message: "Message not found with Id " + req.params.messageId

                })
            }
            return res.status(500).send({
                message: "Could not delete message with Id " + req.params.messageId
            })
        })
}