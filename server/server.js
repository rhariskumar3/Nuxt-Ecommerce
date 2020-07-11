const express = require("express");
const cors = require("cors");
bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

const port = process.env.API_PORT || 3030;
app.set("port", port);

app.use(cors());

app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Server not found!"));

require("./server/routes/approutes")(app);

app.listen(port, () =>
    console.log(`'Server running on http://localhost:${port}!`)
);