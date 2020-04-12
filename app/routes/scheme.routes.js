module.exports = app => {
    const schemes = require("../controllers/scheme.controller");

    // Create a new user
    app.post("/schemes", schemes.register);

    // Retrieve all Schemes
    app.get("/schemes", schemes.findAll);

    // Retrieve a single scheme with schemeId
    app.get("/scheme/me", schemes.findOne);


    // Delete a scheme with schemeId
    app.delete("/schemes/:schemeId", schemes.delete);
};
