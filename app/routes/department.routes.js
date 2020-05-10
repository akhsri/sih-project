module.exports = app => {
    const departments = require("../controllers/department.controller");
    const auth = require("../../config/api.auth");

    // Create a new department
    app.post("/departments", auth, departments.create);

    // Delete a department with department Id
    app.delete("/departments", departments.delete);
}