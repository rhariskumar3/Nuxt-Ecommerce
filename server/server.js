const express = require("express");
const app = express();
bodyParser = require("body-parser");
const db = require("./server/db/db");
const port = 3030;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => res.send("Server not found!"));

app.listen(port, () => console.log(`RESTful API server started on: ${port}!`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require("./server/routes/approutes");
routes(app);