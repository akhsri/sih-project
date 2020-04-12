module.exports = app => {
    const requests = require("../controllers/fundRequest.controller");

    // Create a new request
    app.post("/requests", requests.create)

    // Find all requests from the database
    app.get("./requests", requests.findAll)

    // Find a single request with request ID
    app.get("./requests/me", requests.findOne)

    // Delete a request with requestID
    app.delete("/requests/:requestId", requests.delete)
}