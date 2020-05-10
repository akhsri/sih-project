const fundRequest = require("../models/fundRequest.model");

// Create a request
module.exports.create = (req, res) => {
    var request = new fundRequest();

    request.requestTo = req.body.requestTo;
    request.requestFrom = req.body.requestFrom;
    request.schemeId = req.body.schemeId;
    request.requestState = req.body.requestState;
    console.log("req.user: ", req.user);
    request
        .save()
        .then(request => {
            console.log("error");
            res.status(200);
            res.json({
                request: request
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })

        })
}
// Find all fund requests in the database
exports.findAll = (req, res) => {
    fundRequest.find()
        .then(requests => {
            res.status(200).json(requests);
        }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving requests."
            });
        });
};

// Find a fund request with a request id
exports.findOne = (req, res) => {
    fundRequest.findById({
        _id: req.params.requestId
    })
        .then(request => {
            if (!request) {
                return res.status(404).send({
                    message: "Fund Request not found with ID " + req.request._id
                })
            }
            res.send(request);
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Fund Request not found with ID " + req.request._id
                })
            }
            return res.status(500).send({
                message: "Error retreiving request with ID " + req.request._id
            })
        })
}

// Update a fund request
exports.update = (req, res) => {
    if (!req.body.requestState) {
        return res.status(400).send({
            message: "Request state can not be empty"
        })
    }

    if (req.body.requestFrom || req.body.requestTo || req.body.schemeId) {
        return res.status(401).send({
            message: "User not authorized to update any other fields than requestState"
        })
    }


    fundRequest.findById(req.params.requestId)
        .then(request => {
            if (!request) {
                return res.status(404).send({
                    message: "Fund request not found with id " + req.params.requestId
                })
            }
            console.log(" in find by id function", request);
            var receiverID = request.requestTo;
            console.log("recieverID: ", receiverID);
            console.log("req.user._id: ", req.user._id);
            //res.send(request);
            if (req.user._id == receiverID) {
                fundRequest.findByIdAndUpdate(req.params.requestId, {
                    requestState: req.body.requestState
                }, { new: true })
                    .then(request => {
                        if (!request) {
                            return res.status(404).send({
                                message: "Fund request not found with id " + req.params.requestId
                            });
                        }
                        //console.log("req.user: ", req.user);
                        console.log("new state: ", request.requestState);
                        res.send(request);

                    })
                    .catch(err => {
                        if (err.kind === "ObjectId") {
                            return res.status(404).send({
                                message: "Fund request not found with id " + req.params.requestId
                            });
                        }
                    })
            }
            else {
                console.log("User does not have authorization to change fund request status");
                res.status(403).send({
                    message: "User does not have authorization to change fund request status"
                })
            }

        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Fund request not found with id " + req.params.requestId
                });
            }
        })


    //console.log("req.user: ", req.user);
    //console.log("req.body: ", req.body);
    //console.log("receiverID2: ", receiverID)




}

// Delete a request
exports.delete = (req, res) => {
    fundRequest.findByIdAndRemove(req.params.requestId)
        .then(request => {
            if (!request) {
                return res.status(404).send({
                    message: "Fund Request not found with Id " + req.params.requestId
                })
            }
            res.send({ message: "Request deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Request not found with id " + req.params.requestId
                });
            }
            return res.status(500).send({
                message: "Could not delete request with id " + req.params.requestId
            });
        });
}