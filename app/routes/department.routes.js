module.exports = app => {
    const departments = require("../controllers/department.controller");

    // Create a new department
    app.post("./departments", departments.create);

    // Delete a department with department Id
    app.delete("./departments", departments.delete);
}