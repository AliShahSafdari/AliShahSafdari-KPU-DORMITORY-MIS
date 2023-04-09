//* INTERNAL MODULES
const path = require("path");

//* EXTERNAL MODULES
const express = require("express");
const mongoose = require('mongoose');
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require('express-fileupload');
const passport = require('passport');
const dotenv = require("dotenv");
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require("connect-mongo");


const connectDB = require("./configs/db");

//* LOAD CONFIGS
dotenv.config({ path: "./configs/config.env" });

//* DATABASE CONNECTIONS
connectDB();

//* PASSPORT CONFIGURATION
require('./configs/passport');

const app = express();

//* VIEW ENGINE
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/mainLayout");
app.set("views", "views");

//* BODY PARSER
app.use(express.urlencoded({ extended: true }));

//* FILE UPLOAD MIDDLEWARE
app.use(fileUpload());

//* SESSION
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  unset: "destroy",
  cookie: { httpOnly: true },
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/DMIS_db",
    autoRemove: "native",
  }),
}))

//* PASSPORT
app.use(passport.initialize());
app.use(passport.session());
require('./configs/passport');
//* USER FOR RBAC
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})
//* FLASH
app.use(flash());
//* flash messages middleware
app.use(
  (req, res, next) => {
    res.locals.message = req.flash();
    next();
  }
)

//* STATIC FOLDERS
app.use(express.static(path.join(__dirname, "public")));

//* ROUTES AND MIDDLEWARES
app.use("/", require("./routes/indexRouts"));
app.use("/feed-management", require("./routes/feedManagementRouts"));
app.use("/office-management", require("./routes/officeManagementRouts"));
app.use("/goods-management", require("./routes/goodsManagementRouts"));
app.use(require("./controllers/index/errorController").get404);
app.use(require("./controllers/index/errorController").get500);


//? @DES-> PORT NUMBER THAT WEBSITE IS RUNNIG ON
//? @LOC-> CONFIGS/CONFIG.ENV
const PORT = process.env.PORT || 3000;
//* EXPRESS SERVER
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
