
//  at last merge to master from backend ---> to-do

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const database = require("./config/database");
database.connect();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.listen(3000, ()=> {
    console.log(`Server started at Port ${PORT}`);
})