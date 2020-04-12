const fundRequest = require("../models/fundRequest.model");

// Create a request
module.exports.create = (req, res) => {
    var request = new fundRequest();

    request.requestTo = req.body.requestTo;
    request.requestFrom = req.body.requestFrom;
    request.requestState = req.body.requestState;

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
// Find all requests in the database
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

// Find a request with a request id
exports.findOne = (req, res) => {
    fundRequest.findById(req.request._id)
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