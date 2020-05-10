module.exports = app => {
    const schemes = require("../controllers/scheme.controller");
    const auth = require("../../config/api.auth");

    // Create a new user
    app.post("/schemes", auth, schemes.register);

    // Retrieve all Schemes
    app.get("/schemes", schemes.findAll);

    // Retrieve a single scheme with schemeId
    app.get("/schemes/:schemeId", schemes.findOne);


    // Delete a scheme with schemeId
    app.delete("/schemes/:schemeId", schemes.delete);
};
