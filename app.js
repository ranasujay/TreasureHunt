const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const connectDB = require("./config/mongoDB_connect");
const adminRouter = require("./routes/adminRouter");
const usersRouter = require("./routes/usersRouter");
const checkerRouter = require("./routes/checkerRouter");
const index = require("./routes/index");
const dotenv = require("dotenv");



dotenv.config();
connectDB();
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", index);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/checker", checkerRouter);


app.listen(3000, () => {
    console.log("running at 3000");
});
