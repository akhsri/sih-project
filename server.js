const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
var morgan = require("morgan");


const app = express();

var passport = require("passport");

// allow CORS
app.use(cors());

app.use(morgan("combined"))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// Configuiring the database
const dbConfig = require('./config/database.config');
const mongoose = require("mongoose");

require("./config/passport");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log("Couldn't connect to the database. Exiting now....", err);
    process.exit();
})

app.get("/", (req, res) => {
    res.json({ "message": "Welcome to Niti Sanchar app" });
});

// .....
app.use(passport.initialize());

// Require Department routes
require("./app/routes/department.routes")(app);

// Require users route
require("./app/routes/user.routes")(app);

// Require schemes route
require("./app/routes/scheme.routes")(app);

// Require Fund request routes
require("./app/routes/fundRequest.routes")(app);



app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

