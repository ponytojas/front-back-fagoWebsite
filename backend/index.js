const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./lib/logger")
const helmet = require("helmet")

// set up port
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(helmet())

// add routes
const router = require("./routes/router.js");
app.use("/", router);

// run server
app.listen(PORT, logger.log(`Server running on port ${PORT}`, 0))

