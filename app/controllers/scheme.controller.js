const Scheme = require("../models/scheme.model");

var sendJSONresponse = function (res, status, content) {
    res.status(response);
    res.json(content);
}

// Create a scheme

module.exports.register = function (req, res) {
    var scheme = new Scheme();
    scheme.schemeName = req.body.schemeName;
    scheme.content = req.body.content;

    scheme.
        save()
        .then(scheme => {

            res.status(200);
            res.json({
                scheme: scheme
            })

        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
            console.log("error: ", res.error);
        })
}

// Find all schemes in the database

exports.findAll = (req, res) => {
    Scheme.find()
        .then(schemes => {
            res.status(200).json(schemes);
        }).catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};


// Find a specific scheme in the database using scheme ID

exports.findOne = (req, res) => {
    Scheme.findById(req.scheme._id)
        .then(scheme => {
            if (!scheme) {
                return res.status(404).send({
                    message: "Scheme not found with id " + req.scheme._id
                })
            }
            res.send(scheme)
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Scheme not found with id " + req.scheme._id
                });
            }
            return res.status(500).send({
                message: "Error retreiving scheme with id " + req.scheme._id
            });
        });
};


// Delete a scheme with specific id from database

exports.delete = (req, res) => {
    Scheme.findByIdAndRemove(req.params.schemeId)
        .then(scheme => {
            // if(!scheme) {
            //     return res.status(404).send({
            //         message: "Scheme not found with id " + req.params.schemeId
            //     });
            // }
            res.send({ message: "Scheme deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Scheme not found with id " + req.params.schemeId
                });
            }
            return res.status(500).send({
                message: "Could not delete scheme with id " + req.params.schemeId
            });
        });
};
