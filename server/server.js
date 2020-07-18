const express = require("express");
const cors = require("cors");
bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");

const app = express();

const port = process.env.API_PORT || 3030;
app.set("port", port);

app.use(cors());

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => res.send("Server not found!"));

require("./server/routes/approutes")(app);

app.listen(port, () =>
    console.log(`'Server running on http://${process.env.API_HOST}:${port}!`)
);