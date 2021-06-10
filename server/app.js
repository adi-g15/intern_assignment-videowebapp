const createError = require("http-errors"); // for development
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config(); // Just loads environment variables from .env file, into the process.env object of node

const app = express();

app.use(rateLimit({
	windowMs: 30 * 60000,
	max: 100
}));

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));





// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.code + " - " + err.message;
	res.locals.error = req.app.get("env") !== "production" ? err : {};
	console.error(`Error, Code - ${err.code} and Message - ${err.message}`);

	// render the error page
	res.sendStatus(err.status || 500);
});

module.exports = app;
