const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName : {
            type : String,
            required : true,
            trim : true
        },
        lastName : {
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            trim : true,
        },
        password : {
            type : String,
            required : true,
        },
        accountType : {
            type : String,
            enum : ["Admin", "Student", "Faculty", "Aicte-Member"],
            required : true
        }
    }
);