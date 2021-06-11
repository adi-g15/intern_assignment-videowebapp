const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const { exit } = require("process");
const morgan = require("morgan");
const session = require('express-session');// @note - Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side
const MongoStore = require('connect-mongo');
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const IndexRouter = require("./routes/index");
const GetInfoRouter = require("./routes/get-info");
const SearchRouter = require("./routes/search");

const PORT = process.env.PORT || 5000;
const DB_NAME = "muckin_testing";

const MONGO_DB_URI = `mongodb+srv://AdiG15:${process.env.DB_PASSWORD}@cluster0.uk40q.mongodb.net?retryWrites=true`; // @note - Don't modify this, if it doesn't work for you please ask
console.log(MONGO_DB_URI);
mongoose
  .connect(MONGO_DB_URI , {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: DB_NAME
  })
  .catch((err) => {
    console.error(`Error in DB connection: mongo DB couldn't be reached`);
    console.error(err);
    exit(1);
  });

const db = mongoose.connection; //access to the pending connection
db.on("error", (err) => {
  console.log(`Error in DB connection`);
  console.error(err);
});
db.once("open", () => {
  console.log(`Connected to the database : ${DB_NAME}`);
});

app.use(morgan("dev")); // to log requests made to api
app.use(	// adding since this is using databases
  rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 100,
  })
);

app.use(helmet);

// whitelist to allow CORS request from
const whitelist = ["http://localhost:3000", "https://app.netlify.com/", "https://muckin.netlify.app"];
app.use(
  require("cors")({
    origin: (origin, cb) => {
		cb(null, true);	// todo- Decide after deploying this video site
    //   if(whitelist.includes(origin))
    //     cb(null, true);
    //   else cb('Not allowed by CORS');
    }
  })
);

app.use(express.urlencoded({ extended: false })); // to parse url encoded data and form inputs
app.use(express.json()); // to parse json data
app.use(
  session({
	secret: 'adfubua893',	// hardcoding secret
    resave: false, // since connect-mongo implements `touch` method, so resave:true not required
    saveUninitialized: false, // useful for implementing login sessions
    cookie: {
      maxAge: 14 * 24 * 3600, // 14 days
    },
	store: MongoStore.create({
		mongoUrl: MONGO_DB_URI,
		dbName: "session-store"
	  }),
  })
);


// Routes START
app.use('/', IndexRouter);
app.use('/get-info', GetInfoRouter);
app.use('/searc', SearchRouter);
// Routes END


//404 and Error handlers
app.use((req, res, next) => {
  //catch any request to endpoint not available
  next({ status: 404, message: `Route ${req.baseUrl} not found` }, req, res);
});
app.use((err, req, res, next) => {
  //error handler
  res
    .status(err.status || 500)
    .send(err.message || `Request couldn't be completed`);
});

const s = app.listen(PORT, console.log(`Server listening on ${PORT}`));
