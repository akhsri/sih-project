module.exports = app => {
    const messages = require("../controllers/message.controller");
    const auth = require("../../config/api.auth")

    // Create a message
    app.post("/messages", auth, messages.create);

    // Find messages by channelID
    app.get("/messages", auth, messages.find);

    // Delete a message
    app.post("/messages/:messageId", auth, messages.delete);
}