
//  at last merge to master from backend ---> to-do

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
database.connect();


const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const instituteRoutes = require("./routes/Institute");
const scholarshipRoutes = require("./routes/Scholarship");
const nirfRoutes = require("./routes/Nirf");

app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(cookieParser());

app.use(
    cors({
        origin : "http://localhost:3000",
        credentials : true,
    })
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
cloudinaryConnect();


// // middlewares
app.use((req,res,next)=>{
    console.log("http method->"+req.method+",URL->"+ req.url);
    next();
})

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/institute", instituteRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/scholarship", scholarshipRoutes);
app.use("/api/v1/nirf-ranking", nirfRoutes)

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.listen(PORT, ()=> {
    console.log(`Server started at Port ${PORT}`);
});