module.exports = app => {
    const channels = require("../controllers/channel.controller");
    const auth = require("../../config/api.auth");

    // Create a new channel
    app.post("/channels", auth, channels.create);

    // Delete a channel
    app.delete("/channels/:channelId", channels.delete);
}