const Department = require("../models/department.model");

module.exports.create = (req, res) => {
    var department = new Department();

    department.name = req.body.name;

    department
        .save()
        .then(department => {
            res.status(200);
            res.json({
                department: department
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}


// Deleting a department
exports.delete = (req, res) => {
    Department.findByIdAndRemove(req.params.departmentId)
        .then(department => {
            if (!department) {
                return res.status(404).send({
                    message: "Department not found with Id " + req.params.departmentId
                })
            }
            res.send({
                message: "Department deleted successfully"
            })
        })
        .catch(error => {
            if (error.kind === "ObjectId" || error.name === "NotFound") {
                return res.status(404).send({
                    message: "Department not found with Id " + req.params.departmentId

                })
            }
            return res.status(500).send({
                message: "Could not delete department with Id " + req.params.departmentId
            })
        })
}

