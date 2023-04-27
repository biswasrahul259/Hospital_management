const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const path = require("path");
const multer = require("multer");
const adminAuth = require("./middleware/adminAuthveryfy");
const app = express();



//use express-session
app.use(
  session({
    secret: "rahul",
    saveUninitialized: true,
    resave: false,
  })
);

//app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

//use cokieParser
app.use(cookieParser());
app.set("view engine", "ejs");

app.set("views", "views");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/upload", express.static(path.join(__dirname, "Upload")));
app.use(express.static("upload"));

//use multer for file upload

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Upload");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg") ||
    file.mimetype.includes("webp")
  ) {
    callback(null, true);
  } else {
    console.log("Error in uploading");
    callback(null, false);
  }
};

app.use(
  multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fieldSize: 1024 * 1024 * 5 },
  }).single("image")
);

app.use(adminAuth.authJwt);

//difind admin Router
const Router = require("./router/adminRoute");
app.use(Router);

//Client Rouer
const ClientRouter = require('./router/clientRouter')
app.use(ClientRouter);

//doctor api (for show doctor department wise)
const doctorApi = require('./router/apiRouter')
app.use(doctorApi)


//server and mongoose connection
mongoose.set("strictQuery", true);
const port = process.env.PORT || 2001;
mongoose
  .connect(
    "mongodb+srv://nodejs:203iv1Bxnx19oPOV@cluster0.zjbgce3.mongodb.net/doctor_project01",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(
        `server is connnected succesfully !! @ http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.log("something went wrong");
  });
