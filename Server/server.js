
//  at last merge to master from backend ---> to-do

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const database = require("./config/database");
database.connect();

const userRoutes = require("./routes/User");

app.use(express.json());
app.use(cookieParser());

// // middlewares
app.use((req,res,next)=>{
    console.log("http method->"+req.method+",URL->"+ req.url);
    next();
})

// routes
app.use("/api/v1/auth", userRoutes);

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.listen(3000, ()=> {
    console.log(`Server started at Port ${PORT}`);
});