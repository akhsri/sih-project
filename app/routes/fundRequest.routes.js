module.exports = app => {
    const requests = require("../controllers/fundRequest.controller");
    const auth = require("../../config/api.auth");

    // Create a new request
    app.post("/requests", auth, requests.create)

    // Find all requests from the database
    app.get("/requests", requests.findAll)

    // Find a single request with request ID
    app.get("/requests/:requestId", requests.findOne)

    // Update a single request with request ID
    app.put("/requests/:requestId/request-state", auth, requests.update)

    // Delete a request with requestID
    app.delete("/requests/:requestId", auth, requests.delete)
}