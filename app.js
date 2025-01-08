const express = require('express');
const app = express();

const cookieParser = require("cookie-parser");
const path = require('path');

const ownerRouter = require("./routes/ownersRouter");
const userRouter = require("./routes/usersRouter");
const productRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");
const session = require('express-session');
const flash = require("flash");


const db = require("./config/mongoose-connection");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    cookie: { maxAge: 60000 }
  }));
app.use(flash());

app.use("/",indexRouter);
app.use("/owners",ownerRouter);
app.use("/users",userRouter);
app.use("/products",productRouter);


app.listen(3000);